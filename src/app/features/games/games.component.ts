import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameWithId } from '../../core/models/game.interface';
import { GameCardComponent } from '../../core/components/game-card/game-card.component';
import { MediaSearchComponent } from '../../core/components/media-search/media-search.component';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, GameCardComponent, MediaSearchComponent],
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent {
  @Input() gamesList: GameWithId[] = [];
  @Input() uid = '';
}
