import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { User } from '../models/user.interface';
import { firstValueFrom, Observable, of, throwError } from 'rxjs';
import { UserGameType } from '../models/game.interface';
import { AuthenticationService } from './authentication.service';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  currentUser$?: Observable<User | undefined>;
  private usersPath = '/users';
  usersRef: AngularFirestoreCollection<User>;

  constructor(
    private db: AngularFirestore,
    private authenticationService: AuthenticationService,
    private store: Store,
  ) {
    this.usersRef = db.collection(this.usersPath);
  }

  get(uid?: string) {
    if (uid) {
      return this.usersRef.doc(uid).valueChanges();
    } else {
      return of(undefined);
    }
  }
  create(id: string) {
    return this.usersRef
      .doc(id)
      .set({ collection: { games: [], movies: [], albums: [] } });
  }

  async addGameToCollection(gameData: UserGameType) {
    const authUser = await firstValueFrom(this.authenticationService.getUser());
    if (!authUser) {
      throwError(() => new Error('Authentication failed'));
      return;
    }

    const user = await firstValueFrom(this.get(authUser.uid));
    if (!user || !authUser?.uid) {
      throwError(() => new Error('Could not find user'));
      return;
    }

    const data = user;
    const gamesCollection = data.collection.games;
    let isInArray = false;
    for (let i = 0; i < gamesCollection.length; i++) {
      if (gameData.ref.id == gamesCollection[i].ref.id) {
        gamesCollection[i].in_collection = true;
        isInArray = true;
        break;
      }
    }
    if (!isInArray) gamesCollection.push(gameData);
    data.collection.games = gamesCollection;
    return this.usersRef.doc(authUser.uid).update(data);
  }

  async updateGameFromCollection(gameData: UserGameType) {
    const authUser = await firstValueFrom(this.authenticationService.getUser());
    if (!authUser) {
      throwError(() => new Error('Authentication failed'));
      return;
    }

    const user = await firstValueFrom(this.get(authUser.uid));
    if (!user || !authUser?.uid) {
      throwError(() => new Error('Could not find user'));
      return;
    }

    const data = user;
    const gamesCollection = data.collection.games;
    for (let i = 0; i < gamesCollection.length; i++) {
      if (gameData.ref.id == gamesCollection[i].ref.id) {
        gamesCollection[i] = gameData;
        break;
      }
    }
    data.collection.games = gamesCollection;
    return this.usersRef.doc(authUser.uid).update(data);
  }

  async removeGameFromCollection(gameId: string) {
    const authUser = await firstValueFrom(this.authenticationService.getUser());
    if (!authUser) {
      throwError(() => new Error('Authentication failed'));
      return;
    }

    const user = await firstValueFrom(this.get(authUser.uid));
    if (!user || !authUser?.uid) {
      throwError(() => new Error('Could not find user'));
      return;
    }

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
    return this.usersRef.doc(authUser.uid).update(data);
  }
}
