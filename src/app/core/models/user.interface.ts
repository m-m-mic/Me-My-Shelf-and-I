import firebase from 'firebase/compat';
import DocumentReference = firebase.firestore.DocumentReference;
import { UserGameType } from './game.interface';

export interface User {
  id?: string;
  collection: Collection;
}

interface Collection {
  games: UserGameType[];
  movies: DocumentReference[];
  music: DocumentReference[];
}
