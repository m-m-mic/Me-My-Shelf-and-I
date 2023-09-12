import firebase from 'firebase/compat';
import DocumentReference = firebase.firestore.DocumentReference;

export interface User {
  id?: string;
  collection: Collection;
}

interface Collection {
  games: DocumentReference[];
  movies: DocumentReference[];
  music: DocumentReference[];
}
