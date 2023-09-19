import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../core/services/authentication.service';
import { take } from 'rxjs';
import { AlbumCardComponent } from '../../core/components/album-card/album-card.component';
import { AlbumWithId } from '../../core/models/album.interface';
import { AlbumsService } from '../../core/services/albums.service';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule, AlbumCardComponent],
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent {
  albumsList: AlbumWithId[] = [];
  uid!: string;

  constructor(
    private albumsService: AlbumsService,
    private authenticationService: AuthenticationService,
  ) {
    this.albumsService.getAll().then((albums) => (this.albumsList = albums));
    this.authenticationService
      .getUser()
      .pipe(take(1))
      .subscribe((user) => {
        if (user) this.uid = user.uid;
      });
  }
}
