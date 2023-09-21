import { DestroyRef, Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { UsersService } from './users.service';
import { AuthenticationService } from './authentication.service';
import { firstValueFrom, map } from 'rxjs';
import { Movie, MovieWithId, UserMovie } from '../models/movie.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const MOVIES_PATH = '/movies';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  moviesRef: AngularFirestoreCollection<Movie>;
  constructor(
    private usersService: UsersService,
    private authenticationService: AuthenticationService,
    private destroyRef: DestroyRef,
    private db: AngularFirestore,
  ) {
    this.moviesRef = db.collection(MOVIES_PATH);
  }
  getAll() {
    return this.moviesRef.snapshotChanges().pipe(
      takeUntilDestroyed(this.destroyRef),
      map((movies) => {
        return movies.map(
          (movie): MovieWithId => ({
            id: movie.payload.doc.id,
            ...movie.payload.doc.data(),
          }),
        );
      }),
    );
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
    };
    this.addUser(movieId);
    this.usersService.addMovieToCollection(movie);
  }

  removeFromUserCollection(movieId: string) {
    this.removeUser(movieId);
    this.usersService.removeMovieFromCollection(movieId);
  }
}
