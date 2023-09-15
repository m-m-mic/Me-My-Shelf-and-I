import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { GameType, UserGameType } from '../models/game.interface';
import { UsersService } from './users.service';
import { firstValueFrom, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class GamesService {
  private gamesPath = '/games';
  gamesRef: AngularFirestoreCollection<GameType>;
  constructor(
    private usersService: UsersService,
    private authenticationService: AuthenticationService,
    private db: AngularFirestore,
  ) {
    this.gamesRef = db.collection(this.gamesPath);
  }

  getAll() {
    return this.gamesRef;
  }

  get(id: string) {
    return this.gamesRef.doc(id).valueChanges();
  }

  async addUser(gameId: string) {
    const game = await firstValueFrom(this.get(gameId));
    const authUser = await firstValueFrom(this.authenticationService.getUser());

    if (!game || !authUser?.uid) {
      throwError(() => new Error('Could not find game or user'));
      return;
    }

    const data = game;
    data.saved_by.push(authUser.uid);
    await this.gamesRef.doc(gameId).update(data);
  }

  async removeUser(gameId: string) {
    const game = await firstValueFrom(this.get(gameId));
    const authUser = await firstValueFrom(this.authenticationService.getUser());

    if (!game || !authUser?.uid) {
      throwError(() => new Error('Could not find game or user'));
      return;
    }

    const data = game;
    data.saved_by = data.saved_by.filter((id) => id !== authUser.uid);
    return this.gamesRef.doc(gameId).update(data);
  }

  async saveToUserCollection(gameId: string) {
    const game: UserGameType = {
      ref: this.gamesRef.doc(gameId).ref,
      in_collection: true,
      format: 'physical',
      progress: 'not-started',
      notes: '',
    };
    await this.addUser(gameId);
    await this.usersService.addGameToCollection(game);
  }

  async removeFromUserCollection(gameId: string) {
    await this.removeUser(gameId);
    await this.usersService.removeGameFromCollection(gameId);
  }
}
