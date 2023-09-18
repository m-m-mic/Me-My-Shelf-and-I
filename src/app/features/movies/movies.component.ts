import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieWithId } from '../../core/models/movie.interface';
import { MoviesService } from '../../core/services/movies.service';
import { AuthenticationService } from '../../core/services/authentication.service';
import { take } from 'rxjs';
import { MovieCardComponent } from '../../core/components/movie-card/movie-card.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent {
  moviesList: MovieWithId[] = [];
  uid!: string;

  constructor(
    private moviesService: MoviesService,
    private authenticationService: AuthenticationService,
  ) {
    this.moviesService.getAll().then((movies) => (this.moviesList = movies));
    this.authenticationService
      .getUser()
      .pipe(take(1))
      .subscribe((user) => {
        if (user) this.uid = user.uid;
      });
  }
}
