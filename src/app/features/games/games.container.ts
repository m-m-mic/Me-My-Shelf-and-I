import { Component, inject } from '@angular/core';
import { GamesComponent } from './games.component';
import { map, take } from 'rxjs';
import { GamesService } from '../../core/services/games.service';
import { AuthenticationService } from '../../core/services/authentication.service';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [GamesComponent, AsyncPipe],
  template: `
    <app-games
      [gamesList]="(gamesList$ | async) ?? []"
      [uid]="(uid$ | async) ?? ''" />
  `,
})
export class GamesContainerComponent {
  gamesService = inject(GamesService);
  authenticationService = inject(AuthenticationService);

  gamesList$ = this.gamesService.getAll();
  uid$ = this.authenticationService.getUser().pipe(
    take(1),
    map((user) => user?.uid),
  );
}
