import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameWithIdType } from '../../models/game.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent {
  @Input({ required: true }) data!: GameWithIdType;
  url = `/games/${this.data.id}`;
}
