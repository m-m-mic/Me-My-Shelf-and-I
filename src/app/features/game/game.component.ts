import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesService } from '../../core/services/games.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { take } from 'rxjs';
import { GameType } from '../../core/models/game.interface';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  private id!: string;
  gameData!: GameType;

  constructor(
    private gamesService: GamesService,
    private route: ActivatedRoute,
  ) {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const paramId = params.get('gameId');
      if (paramId) {
        this.id = paramId;
        this.gamesService
          .getGame(this.id)
          .pipe(take(1))
          .subscribe((game) => {
            if (game) {
              this.gameData = game;
            }
          });
      }
    });
  }
}
