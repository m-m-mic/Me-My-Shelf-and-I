import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesService } from '../../core/services/games.service';
import { GameWithIdType } from '../../core/models/game.interface';
import { take } from 'rxjs';
import { GameCardComponent } from '../../core/components/game-card/game-card.component';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, GameCardComponent],
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent {
  gamesList: GameWithIdType[] = [];

  constructor(private gamesService: GamesService) {
    this.gamesService
      .getAll()
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((games) => {
        const gamesWithIds: GameWithIdType[] = [];
        games.map((game) => {
          gamesWithIds.push({
            id: game.payload.doc.id,
            ...game.payload.doc.data(),
          });
        });
        this.gamesList = gamesWithIds;
      });
  }
}
