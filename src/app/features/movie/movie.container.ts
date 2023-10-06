import { Component } from '@angular/core';
import { UsersService } from '../../core/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { filter, map, Observable, of, switchMap } from 'rxjs';
import { MoviesService } from '../../core/services/movies.service';
import { Movie, UserMovie } from '../../core/models/movie.interface';
import { MovieComponent } from './movie.component';
import { GameComponent } from '../game/game.component';
import { Score } from '../../core/models/rating.interface';
import { RatingsService } from '../../core/services/ratings.service';

@Component({
  standalone: true,
  imports: [AsyncPipe, MovieComponent, GameComponent],
  template: `
    <app-movie
      [id]="(movieId$ | async) ?? undefined"
      [movieData]="(movieData$ | async) ?? undefined"
      [userMovieData]="(userMovieData$ | async) ?? undefined"
      [score]="(movieScore$ | async) ?? undefined" />
  `,
})
export class MovieContainerComponent {
  movieId$?: Observable<string>;
  movieData$?: Observable<Movie | undefined>;
  userMovieData$?: Observable<UserMovie | undefined>;
  movieScore$?: Observable<Score>;

  constructor(
    private moviesService: MoviesService,
    private usersService: UsersService,
    private ratingsService: RatingsService,
    private route: ActivatedRoute,
  ) {
    this.movieId$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('movieId') ?? ''),
    );
    this.movieData$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('movieId')),
      filter((movieId) => movieId !== null),
      switchMap((movieId) => this.moviesService.get(movieId ?? '')),
    );
    this.userMovieData$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('movieId')),
      filter((movieId) => movieId !== null),
      switchMap((movieId) => this.usersService.getUserMovie(movieId ?? '')),
    );
    this.movieScore$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('movieId')),
      filter((movieId) => movieId !== null),
      switchMap((movieId) =>
        this.ratingsService.getAverageScore(movieId ?? ''),
      ),
    );
  }
}
