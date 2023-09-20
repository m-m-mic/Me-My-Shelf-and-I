import { Component } from '@angular/core';
import { GameComponent } from './game.component';
import { GamesService } from '../../core/services/games.service';
import { UsersService } from '../../core/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Game, UserGame } from '../../core/models/game.interface';

@Component({
  standalone: true,
  imports: [GameComponent, AsyncPipe],
  template: `
    <app-game
      [id]="gameId"
      [gameData]="(gameData$ | async) ?? undefined"
      [userGameData]="(userGameData$ | async) ?? undefined" />
  `,
})
export class GameContainerComponent {
  gameId!: string;
  gameData$?: Observable<Game | undefined>;
  userGameData$?: Observable<UserGame | undefined>;

  constructor(
    private gamesService: GamesService,
    private usersService: UsersService,
    private route: ActivatedRoute,
  ) {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const paramId = params.get('gameId');
      if (paramId) {
        this.gameId = paramId;
        this.gameData$ = this.gamesService.get(this.gameId);
        this.userGameData$ = this.usersService.getUserGame(this.gameId);
      }
    });
  }
}
