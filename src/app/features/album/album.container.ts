import { Component, DestroyRef } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { AlbumComponent } from './album.component';
import { Observable, take } from 'rxjs';
import { Album, UserAlbum } from '../../core/models/album.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { fillGameForm } from '../game/game.form';
import { fillAlbumForm } from './album.form';
import { UsersService } from '../../core/services/users.service';
import { AuthenticationService } from '../../core/services/authentication.service';
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
      [userAlbumData]="userAlbumData"
      [albumForm]="albumForm" />
  `,
})
export class AlbumContainerComponent {
  albumId!: string;
  albumData$?: Observable<Album | undefined>;
  userAlbumData?: UserAlbum;
  albumForm: FormGroup = this.createAlbumForm();

  constructor(
    private albumsService: AlbumsService,
    private usersService: UsersService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private destroyRef: DestroyRef,
    private formBuilder: FormBuilder,
  ) {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const paramId = params.get('albumId');
      if (paramId) {
        this.albumId = paramId;
        this.albumData$ = this.albumsService.get(this.albumId);
        // TODO: Find better alternative
        this.authenticationService
          .getUser()
          .pipe(take(1))
          .subscribe((authUser) =>
            this.usersService
              .get(authUser?.uid)
              .pipe(takeUntilDestroyed(destroyRef))
              .subscribe((user) => {
                if (user) {
                  user.collection.albums.filter((album) => {
                    if (album.ref.id === this.albumId)
                      this.userAlbumData = album;
                  });
                  this.albumForm = formBuilder.group(
                    fillGameForm(this.userAlbumData),
                  );
                }
              }),
          );
      }
    });
  }

  createAlbumForm() {
    return this.formBuilder.group(fillAlbumForm());
  }
}
