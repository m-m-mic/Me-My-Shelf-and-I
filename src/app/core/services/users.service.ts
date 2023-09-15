import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { User, UserCollection } from '../models/user.interface';
import { firstValueFrom, of, throwError } from 'rxjs';
import { GameWithId, UserGame } from '../models/game.interface';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersPath = '/users';
  usersRef: AngularFirestoreCollection<User>;

  constructor(
    private db: AngularFirestore,
    private authenticationService: AuthenticationService,
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

  async getUserData() {
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
    return { uid: authUser.uid, document: user };
  }

  create(id: string) {
    return this.usersRef
      .doc(id)
      .set({ collection: { games: [], movies: [], albums: [] } });
  }

  async getCollection() {
    const userData = await this.getUserData();
    if (!userData) return;

    const collection: UserCollection = {
      games: [],
      movies: [],
      albums: [],
    };

    for (const game of userData.document.collection.games) {
      const gameData = await game.ref.get();
      collection.games.push({
        general: {
          ...gameData.data(),
          id: game.ref.id,
        } as GameWithId,
        user: game,
      });
    }

    return collection;
  }

  async addGameToCollection(gameData: UserGame) {
    const userData = await this.getUserData();
    if (!userData) return;

    const data = userData.document;
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
    return this.usersRef.doc(userData.uid).update(data);
  }

  async updateGameFromCollection(gameData: UserGame) {
    const userData = await this.getUserData();
    if (!userData) return;

    const data = userData.document;
    const gamesCollection = data.collection.games;
    for (let i = 0; i < gamesCollection.length; i++) {
      if (gameData.ref.id == gamesCollection[i].ref.id) {
        gamesCollection[i] = gameData;
        break;
      }
    }
    data.collection.games = gamesCollection;
    return this.usersRef.doc(userData.uid).update(data);
  }

  async removeGameFromCollection(gameId: string) {
    const userData = await this.getUserData();
    if (!userData) return;

    const data = userData.document;
    const gamesCollection = [];
    for (let i = 0; i < data.collection.games.length; i++) {
      if (gameId != data.collection.games[i].ref.id) {
        gamesCollection.push(data.collection.games[i]);
      } else {
        const updatedGame: UserGame = {
          ...data.collection.games[i],
          in_collection: false,
        };
        gamesCollection.push(updatedGame);
      }
    }
    data.collection.games = gamesCollection;
    return this.usersRef.doc(userData.uid).update(data);
  }
}
