import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionBookmark } from '@ng-icons/ionicons';
import { MediaItem } from '../../models/media.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIconComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  viewProviders: [provideIcons({ ionBookmark })],
})
export class CardComponent {
  @Input({ required: true }) data!: MediaItem;
  @Input({ required: true }) uid!: string;

  isInUserCollection() {
    return this.data.saved_by.includes(this.uid);
  }
}
