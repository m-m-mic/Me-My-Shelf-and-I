import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaCategory } from '../../core/models/media.interface';
import { MediaSearchComponent } from '../../core/components/media-search/media-search.component';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule, MediaSearchComponent],
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent {
  @Input() uid = '';
  protected readonly MediaCategory = MediaCategory;
}
