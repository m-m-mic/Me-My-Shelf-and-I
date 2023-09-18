import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { UsersService } from './users.service';
import { AuthenticationService } from './authentication.service';
import { firstValueFrom, throwError } from 'rxjs';
import { Movie, MovieWithId, UserMovie } from '../models/movie.interface';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private moviesPath = '/movies';
  moviesRef: AngularFirestoreCollection<Movie>;
  constructor(
    private usersService: UsersService,
    private authenticationService: AuthenticationService,
    private db: AngularFirestore,
  ) {
    this.moviesRef = db.collection(this.moviesPath);
  }

  async getAll() {
    const movies = await firstValueFrom(this.moviesRef.snapshotChanges());
    const moviesWithId: MovieWithId[] = [];
    movies.map((movie) => {
      moviesWithId.push({
        id: movie.payload.doc.id,
        ...movie.payload.doc.data(),
      });
    });
    return moviesWithId;
  }

  get(id: string) {
    return this.moviesRef.doc(id).valueChanges();
  }

  async addUser(movieId: string) {
    const movie = await firstValueFrom(this.get(movieId));
    const authUser = await firstValueFrom(this.authenticationService.getUser());

    if (!movie || !authUser?.uid) {
      throwError(() => new Error('Could not find movie or user'));
      return;
    }

    const data = movie;
    data.saved_by.push(authUser.uid);
    await this.moviesRef.doc(movieId).update(data);
  }

  async removeUser(movieId: string) {
    const movie = await firstValueFrom(this.get(movieId));
    const authUser = await firstValueFrom(this.authenticationService.getUser());

    if (!movie || !authUser?.uid) {
      throwError(() => new Error('Could not find movie or user'));
      return;
    }

    const data = movie;
    data.saved_by = data.saved_by.filter((id) => id !== authUser.uid);
    return this.moviesRef.doc(movieId).update(data);
  }

  async saveToUserCollection(movieId: string) {
    const movie: UserMovie = {
      ref: this.moviesRef.doc(movieId).ref,
      in_collection: true,
      format: 'physical',
      progress: 'not-started',
      notes: '',
    };
    await this.addUser(movieId);
    await this.usersService.addMovieToCollection(movie);
  }

  async removeFromUserCollection(movieId: string) {
    await this.removeUser(movieId);
    await this.usersService.removeMovieFromCollection(movieId);
  }
}
