import { DestroyRef, Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Game, GameWithId, UserGame } from '../models/game.interface';
import { UsersService } from './users.service';
import { firstValueFrom, map } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Rating } from '../models/rating.interface';

const GAMES_PATH = '/games';

@Injectable({ providedIn: 'root' })
export class GamesService {
  gamesRef: AngularFirestoreCollection<Game>;
  constructor(
    private usersService: UsersService,
    private authenticationService: AuthenticationService,
    private destroyRef: DestroyRef,
    private db: AngularFirestore,
  ) {
    this.gamesRef = db.collection(GAMES_PATH);
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

  async getSearchResults(query: string, filterSaved: boolean, uid: string) {
    let results = await firstValueFrom(
      this.db
        .collection<Game>(GAMES_PATH, (ref) => {
          if (query.trim() === '') {
            return ref;
          }
          return ref.where('title', '==', query);
        })
        .snapshotChanges()
        .pipe(
          map((games) => {
            return games.map(
              (game): GameWithId => ({
                id: game.payload.doc.id,
                ...game.payload.doc.data(),
              }),
            );
          }),
        ),
    );

    if (filterSaved) {
      results = results.filter((result) => !result.saved_by.includes(uid));
    }

    return results;
  }

  get(id: string) {
    return this.gamesRef.doc(id).valueChanges();
  }

  async addUser(gameId: string) {
    const game = await firstValueFrom(this.get(gameId));
    const authUser = await firstValueFrom(this.authenticationService.getUser());

    if (!game || !authUser?.uid) {
      throw new Error('Could not find game or user');
    }

    const data = game;
    data.saved_by.push(authUser.uid);
    this.gamesRef.doc(gameId).update(data);
  }

  async removeUser(gameId: string) {
    const game = await firstValueFrom(this.get(gameId));
    const authUser = await firstValueFrom(this.authenticationService.getUser());

    if (!game || !authUser?.uid) {
      throw new Error('Could not find game or user');
    }

    const data = game;
    data.saved_by = data.saved_by.filter((id) => id !== authUser.uid);
    return this.gamesRef.doc(gameId).update(data);
  }

  saveToUserCollection(gameId: string) {
    const game: UserGame = {
      ref: this.gamesRef.doc(gameId).ref,
      in_collection: true,
      format: 'physical',
      progress: 'not-started',
      notes: '',
      playtime: 0,
      added_on: new Date().getTime(),
      score: 0,
    };
    this.addUser(gameId);
    this.usersService.addGameToCollection(game);
  }

  removeFromUserCollection(gameId: string) {
    this.removeUser(gameId);
    this.usersService.removeGameFromCollection(gameId);
  }
}
