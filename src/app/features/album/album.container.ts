import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { AlbumComponent } from './album.component';
import { Observable } from 'rxjs';
import { Album, UserAlbum } from '../../core/models/album.interface';
import { UsersService } from '../../core/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AlbumsService } from '../../core/services/albums.service';

@Component({
  standalone: true,
  imports: [AsyncPipe, AlbumComponent],
  template: `
    <app-album
      [id]="albumId"
      [albumData]="(albumData$ | async) ?? undefined"
      [userAlbumData]="(userAlbumData$ | async) ?? undefined" />
  `,
})
export class AlbumContainerComponent {
  albumId!: string;
  albumData$?: Observable<Album | undefined>;
  userAlbumData$?: Observable<UserAlbum | undefined>;

  constructor(
    private albumsService: AlbumsService,
    private usersService: UsersService,
    private route: ActivatedRoute,
  ) {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const paramId = params.get('albumId');
      if (paramId) {
        this.albumId = paramId;
        this.albumData$ = this.albumsService.get(this.albumId);
        this.userAlbumData$ = this.usersService.getUserAlbum(this.albumId);
      }
    });
  }
}
