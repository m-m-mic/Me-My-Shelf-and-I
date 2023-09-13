import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { GameType, UserGameType } from '../models/game.interface';
import { UsersService } from './users.service';
import { Observable, take, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GamesService {
  private gamesPath = '/games';
  gamesRef: AngularFirestoreCollection<GameType>;
  constructor(
    private usersService: UsersService,
    private db: AngularFirestore,
  ) {
    this.gamesRef = db.collection(this.gamesPath);
  }

  getAll() {
    return this.gamesRef;
  }

  getGame(id: string) {
    return this.gamesRef.doc(id).valueChanges() as Observable<
      GameType | undefined
    >;
  }

  addUserToGame(gameId: string, userId: string) {
    this.getGame(gameId)
      .pipe(take(1))
      .subscribe((game) => {
        if (game) {
          const data = game;
          data.saved_by.push(userId);
          return this.gamesRef.doc(gameId).update(data);
        } else {
          throwError(() => new Error('Could not find game'));
          return;
        }
      });
  }

  removeUserFromGame(gameId: string, userId: string) {
    this.getGame(gameId)
      .pipe(take(1))
      .subscribe((game) => {
        if (game) {
          const data = game;
          data.saved_by = data.saved_by.filter((id) => id !== userId);
          return this.gamesRef.doc(gameId).update(data);
        } else {
          throwError(() => new Error('Could not find game'));
          return;
        }
      });
  }

  saveGameToCollection(gameId: string, userId: string) {
    const game: UserGameType = {
      ref: this.gamesRef.doc(gameId).ref,
      in_collection: true,
      format: 'physical',
      progress: 'not-started',
      notes: '',
    };
    this.addUserToGame(gameId, userId);
    return this.usersService.addGameToUser(userId, game);
  }

  removeGameFromCollection(gameId: string, userId: string) {
    this.removeUserFromGame(gameId, userId);
    return this.usersService.removeGameFromUser(userId, gameId);
  }
}
