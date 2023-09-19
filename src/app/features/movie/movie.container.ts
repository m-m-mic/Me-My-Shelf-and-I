import { Component, DestroyRef } from '@angular/core';
import { UsersService } from '../../core/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { Observable, take } from 'rxjs';
import { AuthenticationService } from '../../core/services/authentication.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MoviesService } from '../../core/services/movies.service';
import { Movie, UserMovie } from '../../core/models/movie.interface';
import { fillMovieForm } from './movie.form';
import { MovieComponent } from './movie.component';

@Component({
  standalone: true,
  imports: [AsyncPipe, MovieComponent],
  template: `
    <app-movie
      [id]="movieId"
      [movieData]="(movieData$ | async) ?? undefined"
      [userMovieData]="userMovieData"
      [movieForm]="movieForm" />
  `,
})
export class MovieContainerComponent {
  movieId!: string;
  movieData$?: Observable<Movie | undefined>;
  userMovieData?: UserMovie;
  movieForm: FormGroup = this.createMovieForm();

  constructor(
    private moviesService: MoviesService,
    private usersService: UsersService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private destroyRef: DestroyRef,
    private formBuilder: FormBuilder,
  ) {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const paramId = params.get('movieId');
      if (paramId) {
        this.movieId = paramId;
        this.movieData$ = this.moviesService.get(this.movieId);
        // TODO: Find better alternative
        this.authenticationService
          .getUser()
          .pipe(take(1))
          .subscribe((authUser) =>
            this.usersService
              .get(authUser?.uid)
              .pipe(takeUntilDestroyed(destroyRef))
              .subscribe((user) => {
                if (user) {
                  user.collection.movies.filter((movie) => {
                    if (movie.ref.id === this.movieId)
                      this.userMovieData = movie;
                  });
                  this.movieForm = formBuilder.group(
                    fillMovieForm(this.userMovieData),
                  );
                }
              }),
          );
      }
    });
  }

  createMovieForm() {
    return this.formBuilder.group(fillMovieForm());
  }
}
