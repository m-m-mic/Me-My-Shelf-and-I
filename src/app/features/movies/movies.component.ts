import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieWithId } from '../../core/models/movie.interface';
import { MovieCardComponent } from '../../core/components/movie-card/movie-card.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent {
  @Input() moviesList: MovieWithId[] = [];
  @Input() uid = '';
}
