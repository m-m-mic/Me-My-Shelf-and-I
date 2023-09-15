import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesService } from '../../core/services/games.service';
import { GameWithId } from '../../core/models/game.interface';
import { GameCardComponent } from '../../core/components/game-card/game-card.component';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, GameCardComponent],
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent {
  gamesList: GameWithId[] = [];

  constructor(private gamesService: GamesService) {
    gamesService.getAll().then((games) => (this.gamesList = games));
  }
}
