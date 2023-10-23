import { Component, inject } from '@angular/core';
import { map, take } from 'rxjs';
import { AuthenticationService } from '../../core/services/authentication.service';
import { AsyncPipe } from '@angular/common';
import { AlbumsComponent } from './albums.component';
import { AlbumsService } from '../../core/services/albums.service';

@Component({
  standalone: true,
  imports: [AsyncPipe, AlbumsComponent],
  template: `
    <app-albums
      [albumsList]="(albumsList$ | async) ?? []"
      [uid]="(uid$ | async) ?? ''" />
  `,
})
export class AlbumsContainerComponent {
  albumsService = inject(AlbumsService);
  authenticationService = inject(AuthenticationService);

  albumsList$ = this.albumsService.getAll();
  uid$ = this.authenticationService.getUser().pipe(
    take(1),
    map((user) => user?.uid),
  );
}
