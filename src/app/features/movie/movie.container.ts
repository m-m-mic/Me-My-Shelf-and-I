import { Component } from '@angular/core';
import { UsersService } from '../../core/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable, of, switchMap } from 'rxjs';
import { MoviesService } from '../../core/services/movies.service';
import { Movie, UserMovie } from '../../core/models/movie.interface';
import { MovieComponent } from './movie.component';

@Component({
  standalone: true,
  imports: [AsyncPipe, MovieComponent],
  template: `
    <app-movie
      [id]="(movieId$ | async) ?? undefined"
      [movieData]="(movieData$ | async) ?? undefined"
      [userMovieData]="(userMovieData$ | async) ?? undefined" />
  `,
})
export class MovieContainerComponent {
  movieId$?: Observable<string | undefined>;
  movieData$?: Observable<Movie | undefined>;
  userMovieData$?: Observable<UserMovie | undefined>;

  constructor(
    private moviesService: MoviesService,
    private usersService: UsersService,
    private route: ActivatedRoute,
  ) {
    this.movieId$ = this.route.paramMap.pipe(
      switchMap((paramMap) => {
        const id = paramMap.get('movieId');
        if (id) return of(id);
        return of(undefined);
      }),
    );
    this.movieData$ = this.route.paramMap.pipe(
      switchMap((paramMap) => {
        const id = paramMap.get('movieId');
        if (id) return this.moviesService.get(id);
        return of(undefined);
      }),
    );
    this.userMovieData$ = this.route.paramMap.pipe(
      switchMap((paramMap) => {
        const id = paramMap.get('movieId');
        if (id) return this.usersService.getUserMovie(id);
        return of(undefined);
      }),
    );
  }
}
