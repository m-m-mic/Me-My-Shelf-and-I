import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Game } from '../models/game.interface';
import { UsersService } from './users.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GamesService {
  private gamesPath = '/games';
  gamesRef: AngularFirestoreCollection<Game>;
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
    return this.gamesRef.doc(id).valueChanges() as Observable<Game | undefined>;
  }

  saveGameToCollection(gameId: string, userId: string) {
    const game = this.gamesRef.doc(gameId).ref;
    return this.usersService.addGameToUser(userId, game);
  }

  removeGameFromCollection(gameId: string, userId: string) {
    return this.usersService.removeGameFromUser(userId, gameId);
  }
}
