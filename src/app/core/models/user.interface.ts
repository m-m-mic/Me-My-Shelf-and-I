import firebase from 'firebase/compat';
import DocumentReference = firebase.firestore.DocumentReference;
import { CombinedGame, UserGame } from './game.interface';
import { CombinedMovie, UserMovie } from './movie.interface';

export interface User {
  collection: InternalCollection;
}

interface InternalCollection {
  games: UserGame[];
  movies: UserMovie[];
  albums: DocumentReference[];
}

export interface UserCollection {
  games: CombinedGame[];
  movies: CombinedMovie[];
  albums: DocumentReference[];
}
