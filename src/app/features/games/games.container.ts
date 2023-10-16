import { Component, inject } from '@angular/core';
import { GamesComponent } from './games.component';
import { map, take } from 'rxjs';
import { AuthenticationService } from '../../core/services/authentication.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-games-container',
  standalone: true,
  imports: [GamesComponent, AsyncPipe],
  template: `
    <app-games [uid]="(uid$ | async) ?? ''" />
  `,
})
export class GamesContainerComponent {
  authenticationService = inject(AuthenticationService);

  uid$ = this.authenticationService.getUser().pipe(
    take(1),
    map((user) => user?.uid),
  );
}
