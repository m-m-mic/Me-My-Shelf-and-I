import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { UsersService } from './users.service';
import { AuthenticationService } from './authentication.service';
import { firstValueFrom, map } from 'rxjs';
import { Movie, UserMovie } from '../models/movie.interface';
import { MediaCategory, MediaItem } from '../models/media.interface';

const MOVIES_PATH = '/movies';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  moviesRef: AngularFirestoreCollection<Movie>;
  constructor(
    private usersService: UsersService,
    private authenticationService: AuthenticationService,
    private db: AngularFirestore,
  ) {
    this.moviesRef = db.collection(MOVIES_PATH);
  }
  async getSearchResults(query: string, filterSaved: boolean, uid: string) {
    let results = await firstValueFrom(
      this.db
        .collection<Movie>(MOVIES_PATH, (ref) => {
          if (query.trim() === '') {
            return ref.orderBy('title');
          }
          return ref.where('title', '==', query).orderBy('title');
        })
        .snapshotChanges()
        .pipe(
          map((movies) => {
            return movies.map(
              (movie): MediaItem => ({
                id: movie.payload.doc.id,
                category: MediaCategory.MOVIES,
                ...movie.payload.doc.data(),
              }),
            );
          }),
        ),
    );

    if (filterSaved) {
      results = results.filter((result) => !result.saved_by.includes(uid));
    }

    return results;
  }

  get(id: string) {
    return this.moviesRef.doc(id).valueChanges();
  }

  async addUser(movieId: string) {
    const movie = await firstValueFrom(this.get(movieId));
    const authUser = await firstValueFrom(this.authenticationService.getUser());

    if (!movie || !authUser?.uid) {
      throw new Error('Could not find movie or user');
    }

    const data = movie;
    data.saved_by.push(authUser.uid);
    this.moviesRef.doc(movieId).update(data);
  }

  async removeUser(movieId: string) {
    const movie = await firstValueFrom(this.get(movieId));
    const authUser = await firstValueFrom(this.authenticationService.getUser());

    if (!movie || !authUser?.uid) {
      throw new Error('Could not find movie or user');
    }

    const data = movie;
    data.saved_by = data.saved_by.filter((id) => id !== authUser.uid);
    return this.moviesRef.doc(movieId).update(data);
  }

  saveToUserCollection(movieId: string) {
    const movie: UserMovie = {
      ref: this.moviesRef.doc(movieId).ref,
      in_collection: true,
      format: 'physical',
      progress: 'not-started',
      notes: '',
      added_on: new Date().getTime(),
      score: 0,
    };
    this.addUser(movieId);
    this.usersService.addMovieToCollection(movie);
  }

  removeFromUserCollection(movieId: string) {
    this.removeUser(movieId);
    this.usersService.removeMovieFromCollection(movieId);
  }
}
