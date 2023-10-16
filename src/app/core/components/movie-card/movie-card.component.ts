import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { RouterLink } from '@angular/router';
import { ionBookmark } from '@ng-icons/ionicons';
import { MediaItem } from '../../models/media.interface';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, NgIconComponent, RouterLink],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  viewProviders: [provideIcons({ ionBookmark })],
})
export class MovieCardComponent {
  @Input({ required: true }) data!: MediaItem;
  @Input({ required: true }) uid!: string;

  isInUserCollection() {
    return this.data.saved_by.includes(this.uid);
  }
}
