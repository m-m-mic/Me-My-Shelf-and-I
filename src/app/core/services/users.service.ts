import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { User } from '../models/user.interface';
import { first, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersPath = '/users';
  usersRef: AngularFirestoreCollection<User>;

  constructor(private db: AngularFirestore) {
    this.usersRef = db.collection(this.usersPath);
  }

  getUser(id: string) {
    return this.usersRef.doc(id).valueChanges() as Observable<User | undefined>;
  }

  createUser(user: User) {
    return this.usersRef
      .doc(user.id)
      .set({ collection: { games: [], movies: [], music: [] } });
  }

  addGameToUser(userId: string, game: any) {
    this.usersRef
      .doc(userId)
      .valueChanges()
      .pipe(take(1))
      .subscribe((user) => {
        if (user) {
          const data = user;
          const gamesCollection = data.collection.games;
          gamesCollection.push(game);
          data.collection.games = gamesCollection;
          return this.usersRef.doc(userId).update(data);
        } else {
          return undefined;
        }
      });
  }

  removeGameFromUser(userId: string, gameId: string) {
    this.usersRef
      .doc(userId)
      .valueChanges()
      .pipe(take(1))
      .subscribe((user) => {
        if (user) {
          const data = user;
          const gamesCollection = [];
          for (let i = 0; i < data.collection.games.length; i++) {
            if (gameId != data.collection.games[i].id) {
              gamesCollection.push(data.collection.games[i]);
            }
          }
          data.collection.games = gamesCollection;
          return this.usersRef.doc(userId).update(data);
        } else {
          return undefined;
        }
      });
  }
}
