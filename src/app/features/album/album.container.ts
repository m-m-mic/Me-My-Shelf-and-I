import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { AlbumComponent } from './album.component';
import { Observable, of, switchMap } from 'rxjs';
import { Album, UserAlbum } from '../../core/models/album.interface';
import { UsersService } from '../../core/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { AlbumsService } from '../../core/services/albums.service';

@Component({
  standalone: true,
  imports: [AsyncPipe, AlbumComponent],
  template: `
    <app-album
      [id]="(albumId$ | async) ?? undefined"
      [albumData]="(albumData$ | async) ?? undefined"
      [userAlbumData]="(userAlbumData$ | async) ?? undefined" />
  `,
})
export class AlbumContainerComponent {
  albumId$!: Observable<string | undefined>;
  albumData$?: Observable<Album | undefined>;
  userAlbumData$?: Observable<UserAlbum | undefined>;

  constructor(
    private albumsService: AlbumsService,
    private usersService: UsersService,
    private route: ActivatedRoute,
  ) {
    this.albumId$ = this.route.paramMap.pipe(
      switchMap((paramMap) => {
        const id = paramMap.get('albumId');
        if (id) return of(id);
        return of(undefined);
      }),
    );
    this.albumData$ = this.route.paramMap.pipe(
      switchMap((paramMap) => {
        const id = paramMap.get('albumId');
        if (id) return this.albumsService.get(id);
        return of(undefined);
      }),
    );
    this.userAlbumData$ = this.route.paramMap.pipe(
      switchMap((paramMap) => {
        const id = paramMap.get('albumId');
        if (id) return this.usersService.getUserAlbum(id);
        return of(undefined);
      }),
    );
  }
}
