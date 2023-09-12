import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesService } from '../../core/services/games.service';
import { GameTypeWithId } from '../../core/models/game.interface';
import { take } from 'rxjs';
import { MmsaiCardComponent } from '../../core/components/mmsai-card/mmsai-card.component';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, MmsaiCardComponent],
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent {
  gamesList: GameTypeWithId[] = [];

  constructor(private gamesService: GamesService) {
    this.gamesService
      .getAll()
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((games) => {
        const gamesWithIds: GameTypeWithId[] = [];
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
