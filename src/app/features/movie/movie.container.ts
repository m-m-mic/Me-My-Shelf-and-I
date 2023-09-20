import { Component } from '@angular/core';
import { UsersService } from '../../core/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { MoviesService } from '../../core/services/movies.service';
import { Movie, UserMovie } from '../../core/models/movie.interface';
import { MovieComponent } from './movie.component';

@Component({
  standalone: true,
  imports: [AsyncPipe, MovieComponent],
  template: `
    <app-movie
      [id]="movieId"
      [movieData]="(movieData$ | async) ?? undefined"
      [userMovieData]="(userMovieData$ | async) ?? undefined" />
  `,
})
export class MovieContainerComponent {
  movieId!: string;
  movieData$?: Observable<Movie | undefined>;
  userMovieData$?: Observable<UserMovie | undefined>;

  constructor(
    private moviesService: MoviesService,
    private usersService: UsersService,
    private route: ActivatedRoute,
  ) {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const paramId = params.get('movieId');
      if (paramId) {
        this.movieId = paramId;
        this.movieData$ = this.moviesService.get(this.movieId);
        this.userMovieData$ = this.usersService.getUserMovie(this.movieId);
      }
    });
  }
}
