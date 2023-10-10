import { Component, inject } from '@angular/core';
import { GamesComponent } from './games.component';
import { map, take } from 'rxjs';
import { GamesService } from '../../core/services/games.service';
import { AuthenticationService } from '../../core/services/authentication.service';
import { AsyncPipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { convertTitle } from '../../shared/converters/title.converter';

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
  title = inject(Title);

  gamesList$ = this.gamesService.getAll();
  uid$ = this.authenticationService.getUser().pipe(
    take(1),
    map((user) => user?.uid),
  );

  ngOnInit() {
    this.title.setTitle(convertTitle('Games'));
  }
}
