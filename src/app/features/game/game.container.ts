import { Component } from '@angular/core';
import { GameComponent } from './game.component';
import { GamesService } from '../../core/services/games.service';
import { UsersService } from '../../core/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { filter, map, Observable, switchMap } from 'rxjs';
import { Game, UserGame } from '../../core/models/game.interface';
import { Score } from '../../core/models/rating.interface';
import { RatingsService } from '../../core/services/ratings.service';

@Component({
  standalone: true,
  imports: [GameComponent, AsyncPipe],
  template: `
    <app-game
      [id]="(gameId$ | async) ?? undefined"
      [gameData]="(gameData$ | async) ?? undefined"
      [userGameData]="(userGameData$ | async) ?? undefined"
      [score]="(gameScore$ | async) ?? undefined" />
  `,
})
export class GameContainerComponent {
  gameId$?: Observable<string>;
  gameData$?: Observable<Game | undefined>;
  userGameData$?: Observable<UserGame | undefined>;
  gameScore$?: Observable<Score>;

  constructor(
    private gamesService: GamesService,
    private usersService: UsersService,
    private ratingsService: RatingsService,
    private route: ActivatedRoute,
  ) {
    this.gameId$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('gameId') ?? ''),
    );
    this.gameData$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('gameId')),
      filter((gameId) => gameId !== null),
      switchMap((gameId) => this.gamesService.get(gameId ?? '')),
    );
    this.userGameData$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('gameId')),
      filter((gameId) => gameId !== null),
      switchMap((gameId) => this.usersService.getUserGame(gameId ?? '')),
    );
    this.gameScore$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('gameId')),
      filter((gameId) => gameId !== null),
      switchMap((gameId) => this.ratingsService.getAverageScore(gameId ?? '')),
    );
  }
}
