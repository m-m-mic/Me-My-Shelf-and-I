import firebase from 'firebase/compat';
import DocumentReference = firebase.firestore.DocumentReference;
import { UserGameType } from './game.interface';
import { UserMovieType } from './movie.interface';

export interface User {
  id?: string;
  collection: Collection;
}

interface Collection {
  games: UserGameType[];
  movies: UserMovieType[];
  albums: DocumentReference[];
}
