import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaCategory } from '../../core/models/media.interface';
import { MediaSearchComponent } from '../../core/components/media-search/media-search.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, MediaSearchComponent],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent {
  @Input() uid = '';
  protected readonly MediaCategory = MediaCategory;
}
