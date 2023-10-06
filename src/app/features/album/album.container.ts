import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { AlbumComponent } from './album.component';
import { filter, map, Observable, of, switchMap } from 'rxjs';
import { Album, UserAlbum } from '../../core/models/album.interface';
import { UsersService } from '../../core/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { AlbumsService } from '../../core/services/albums.service';
import { Score } from '../../core/models/rating.interface';
import { RatingsService } from '../../core/services/ratings.service';

@Component({
  standalone: true,
  imports: [AsyncPipe, AlbumComponent],
  template: `
    <app-album
      [id]="(albumId$ | async) ?? undefined"
      [albumData]="(albumData$ | async) ?? undefined"
      [userAlbumData]="(userAlbumData$ | async) ?? undefined"
      [score]="(albumScore$ | async) ?? undefined" />
  `,
})
export class AlbumContainerComponent {
  albumId$!: Observable<string>;
  albumData$?: Observable<Album | undefined>;
  userAlbumData$?: Observable<UserAlbum | undefined>;
  albumScore$?: Observable<Score>;

  constructor(
    private albumsService: AlbumsService,
    private usersService: UsersService,
    private ratingsService: RatingsService,
    private route: ActivatedRoute,
  ) {
    this.albumId$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('albumId') ?? ''),
    );
    this.albumData$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('albumId')),
      filter((albumId) => albumId !== null),
      switchMap((albumId) => this.albumsService.get(albumId ?? '')),
    );
    this.userAlbumData$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('albumId')),
      filter((albumId) => albumId !== null),
      switchMap((albumId) => this.usersService.getUserAlbum(albumId ?? '')),
    );
    this.albumScore$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('albumId')),
      filter((albumId) => albumId !== null),
      switchMap((albumId) =>
        this.ratingsService.getAverageScore(albumId ?? ''),
      ),
    );
  }
}
