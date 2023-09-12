import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaType } from '../../models/attribute.types';
import { GameTypeWithId } from '../../models/game.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mmsai-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mmsai-card.component.html',
  styleUrls: ['./mmsai-card.component.scss'],
})
export class MmsaiCardComponent implements OnInit {
  @Input() data!: GameTypeWithId;
  @Input() cardType!: MediaType;
  url!: string;

  ngOnInit() {
    switch (this.cardType) {
      case 'game':
        this.url = `/games/${this.data.id}`;
        break;
      case 'movie':
        this.url = `/movies/${this.data.id}`;
        break;
      case 'music':
        this.url = `/music/${this.data.id}`;
        break;
    }
  }
}
