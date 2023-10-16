import { Component, inject } from '@angular/core';
import { map, take } from 'rxjs';
import { AuthenticationService } from '../../core/services/authentication.service';
import { AsyncPipe } from '@angular/common';
import { AlbumsComponent } from './albums.component';

@Component({
  selector: 'app-albums-container',
  standalone: true,
  imports: [AsyncPipe, AlbumsComponent],
  template: `
    <app-albums [uid]="(uid$ | async) ?? ''" />
  `,
})
export class AlbumsContainerComponent {
  authenticationService = inject(AuthenticationService);

  uid$ = this.authenticationService.getUser().pipe(
    take(1),
    map((user) => user?.uid),
  );
}
