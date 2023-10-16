import { Component, inject } from '@angular/core';
import { map, take } from 'rxjs';
import { AuthenticationService } from '../../core/services/authentication.service';
import { AsyncPipe } from '@angular/common';
import { MoviesComponent } from './movies.component';

@Component({
  standalone: true,
  imports: [AsyncPipe, MoviesComponent],
  template: `
    <app-movies [uid]="(uid$ | async) ?? ''" />
  `,
})
export class MoviesContainerComponent {
  authenticationService = inject(AuthenticationService);

  uid$ = this.authenticationService.getUser().pipe(
    take(1),
    map((user) => user?.uid),
  );
}
