import { Component } from '@angular/core';
import { GameComponent } from './game.component';
import { GamesService } from '../../core/services/games.service';
import { UsersService } from '../../core/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable, of, switchMap } from 'rxjs';
import { Game, UserGame } from '../../core/models/game.interface';

@Component({
  standalone: true,
  imports: [GameComponent, AsyncPipe],
  template: `
    <app-game
      [id]="(gameId$ | async) ?? undefined"
      [gameData]="(gameData$ | async) ?? undefined"
      [userGameData]="(userGameData$ | async) ?? undefined" />
  `,
})
export class GameContainerComponent {
  gameId$?: Observable<string | undefined>;
  gameData$?: Observable<Game | undefined>;
  userGameData$?: Observable<UserGame | undefined>;

  constructor(
    private gamesService: GamesService,
    private usersService: UsersService,
    private route: ActivatedRoute,
  ) {
    this.gameId$ = this.route.paramMap.pipe(
      switchMap((paramMap) => {
        const id = paramMap.get('gameId');
        if (id) return of(id);
        return of(undefined);
      }),
    );
    this.gameData$ = this.route.paramMap.pipe(
      switchMap((paramMap) => {
        const id = paramMap.get('gameId');
        if (id) return this.gamesService.get(id);
        return of(undefined);
      }),
    );
    this.userGameData$ = this.route.paramMap.pipe(
      switchMap((paramMap) => {
        const id = paramMap.get('gameId');
        if (id) return this.usersService.getUserGame(id);
        return of(undefined);
      }),
    );
  }
}
