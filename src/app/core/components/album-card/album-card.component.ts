import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumWithId } from '../../models/album.interface';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { RouterLink } from '@angular/router';
import { ionBookmark } from '@ng-icons/ionicons';

@Component({
  selector: 'app-album-card',
  standalone: true,
  imports: [CommonModule, NgIconComponent, RouterLink],
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.scss'],
  viewProviders: [provideIcons({ ionBookmark })],
})
export class AlbumCardComponent {
  @Input({ required: true }) data!: AlbumWithId;
  @Input({ required: true }) uid!: string;
}
