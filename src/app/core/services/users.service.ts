import { DestroyRef, Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { User } from '../models/user.interface';
import { Observable, take } from 'rxjs';
import {
  CombinedGameType,
  GameType,
  UserGameType,
} from '../models/game.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersPath = '/users';
  usersRef: AngularFirestoreCollection<User>;

  constructor(
    private db: AngularFirestore,
    private destroyRef: DestroyRef,
  ) {
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

  addGameToUser(userId: string, game: UserGameType) {
    this.getUser(userId)
      .pipe(take(1))
      .subscribe((user) => {
        if (user) {
          // TODO: prevent duplicates
          const data = user;
          const gamesCollection = data.collection.games;
          gamesCollection.push(game);
          data.collection.games = gamesCollection;
          return this.usersRef.doc(userId).update(data);
        } else {
          return;
        }
      });
  }

  removeGameFromUser(userId: string, gameId: string) {
    this.getUser(userId)
      .pipe(take(1))
      .subscribe((user) => {
        if (user) {
          const data = user;
          const gamesCollection = [];
          for (let i = 0; i < data.collection.games.length; i++) {
            if (gameId != data.collection.games[i].ref.id) {
              gamesCollection.push(data.collection.games[i]);
            } else {
              const updatedGame: UserGameType = {
                ...data.collection.games[i],
                in_collection: false,
              };
              gamesCollection.push(updatedGame);
            }
          }
          data.collection.games = gamesCollection;
          return this.usersRef.doc(userId).update(data);
        } else {
          return;
        }
      });
  }
}
