import { DestroyRef, Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Game, GameWithId, UserGame } from '../models/game.interface';
import { UsersService } from './users.service';
import { firstValueFrom, map, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class GamesService {
  private gamesPath = '/games';
  gamesRef: AngularFirestoreCollection<Game>;
  constructor(
    private usersService: UsersService,
    private authenticationService: AuthenticationService,
    private destroyRef: DestroyRef,
    private db: AngularFirestore,
  ) {
    this.gamesRef = db.collection(this.gamesPath);
  }

  getAll() {
    return this.gamesRef.snapshotChanges().pipe(
      takeUntilDestroyed(this.destroyRef),
      map((games) => {
        return games.map(
          (game): GameWithId => ({
            id: game.payload.doc.id,
            ...game.payload.doc.data(),
          }),
        );
      }),
    );
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
    const game: UserGame = {
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
