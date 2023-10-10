import { Component, inject, OnInit } from '@angular/core';
import { map, take } from 'rxjs';
import { AuthenticationService } from '../../core/services/authentication.service';
import { AsyncPipe } from '@angular/common';
import { AlbumsComponent } from './albums.component';
import { AlbumsService } from '../../core/services/albums.service';
import { Title } from '@angular/platform-browser';
import { convertTitle } from '../../shared/converters/title.converter';

@Component({
  standalone: true,
  imports: [AsyncPipe, AlbumsComponent],
  template: `
    <app-albums
      [albumsList]="(albumsList$ | async) ?? []"
      [uid]="(uid$ | async) ?? ''" />
  `,
})
export class AlbumsContainerComponent implements OnInit {
  albumsService = inject(AlbumsService);
  authenticationService = inject(AuthenticationService);
  title = inject(Title);

  albumsList$ = this.albumsService.getAll();
  uid$ = this.authenticationService.getUser().pipe(
    take(1),
    map((user) => user?.uid),
  );

  ngOnInit() {
    this.title.setTitle(convertTitle('Albums'));
  }
}
