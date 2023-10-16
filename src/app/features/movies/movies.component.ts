import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../../core/components/movie-card/movie-card.component';
import { MediaItem } from '../../core/models/media.interface';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent {
  @Input() moviesList: MediaItem[] = [];
  @Input() uid = '';
}
