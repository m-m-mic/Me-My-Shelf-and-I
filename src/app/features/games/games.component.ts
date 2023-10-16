import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaSearchComponent } from '../../core/components/media-search/media-search.component';
import { MediaCategory } from '../../core/models/media.interface';
import { MediaDataComponent } from '../../core/components/media-data/media-data.component';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, MediaSearchComponent, MediaDataComponent],
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent {
  @Input() uid = '';
  protected readonly MediaCategory = MediaCategory;
}
