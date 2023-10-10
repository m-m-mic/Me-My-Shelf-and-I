import { Component, inject } from '@angular/core';
import { map, take } from 'rxjs';
import { AuthenticationService } from '../../core/services/authentication.service';
import { AsyncPipe } from '@angular/common';
import { MoviesComponent } from './movies.component';
import { MoviesService } from '../../core/services/movies.service';
import { Title } from '@angular/platform-browser';
import { convertTitle } from '../../shared/converters/title.converter';

@Component({
  standalone: true,
  imports: [AsyncPipe, MoviesComponent],
  template: `
    <app-movies
      [moviesList]="(moviesList$ | async) ?? []"
      [uid]="(uid$ | async) ?? ''" />
  `,
})
export class MoviesContainerComponent {
  moviesService = inject(MoviesService);
  authenticationService = inject(AuthenticationService);
  title = inject(Title);

  moviesList$ = this.moviesService.getAll();
  uid$ = this.authenticationService.getUser().pipe(
    take(1),
    map((user) => user?.uid),
  );

  ngOnInit() {
    this.title.setTitle(convertTitle('Movies'));
  }
}
