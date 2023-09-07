import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersPath = '/users';
  usersRef: AngularFirestoreCollection<User>;

  constructor(private db: AngularFirestore) {
    this.usersRef = db.collection(this.usersPath);
  }

  getAll(): AngularFirestoreCollection<User> {
    return this.usersRef;
  }

  getOne(id: string) {
    return this.usersRef.doc(id);
  }

  create(user: User) {
    return this.usersRef
      .doc(user.id)
      .set({ collection: { games: [], movies: [], music: [] } });
  }
}
