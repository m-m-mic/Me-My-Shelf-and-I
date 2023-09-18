import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameWithId } from '../../models/game.interface';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionBookmark } from '@ng-icons/ionicons';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIconComponent],
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
  viewProviders: [provideIcons({ ionBookmark })],
})
export class GameCardComponent {
  @Input({ required: true }) data!: GameWithId;
  @Input({ required: true }) uid!: string;
}
