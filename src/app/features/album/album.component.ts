import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionAdd, ionBookmark, ionRemove } from '@ng-icons/ionicons';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../core/services/users.service';
import { AlbumsService } from '../../core/services/albums.service';
import { albumItems } from './album.items';
import { createAlbumObject } from './album.form';
import { Album, UserAlbum } from '../../core/models/album.interface';
import { ButtonModule } from 'primeng/button';
import { LoadingComponent } from '../../core/layout/loading/loading.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { movieItems } from '../movie/movie.items';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    ButtonModule,
    LoadingComponent,
    InputTextareaModule,
    ReactiveFormsModule,
    SelectButtonModule,
  ],
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
  viewProviders: [provideIcons({ ionAdd, ionRemove, ionBookmark })],
})
export class AlbumComponent {
  @Input() albumData?: Album;
  @Input() albumForm?: FormGroup;
  @Input() userAlbumData?: UserAlbum;
  @Input() id?: string;

  albumsService = inject(AlbumsService);
  usersService = inject(UsersService);

  selectItems = albumItems;

  addToCollection() {
    if (this.id) this.albumsService.saveToUserCollection(this.id);
  }

  updateData() {
    if (this.userAlbumData && this.albumForm) {
      this.usersService.updateAlbumFromCollection(
        createAlbumObject(this.userAlbumData.ref, this.albumForm),
      );
    }
  }

  removeFromCollection() {
    if (this.id) this.albumsService.removeFromUserCollection(this.id);
  }

  protected readonly movieItems = movieItems;
}
