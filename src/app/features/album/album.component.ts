import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionAdd, ionBookmark, ionRemove } from '@ng-icons/ionicons';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../core/services/users.service';
import { AlbumsService } from '../../core/services/albums.service';
import { createAlbumObject, fillAlbumForm } from './album.form';
import { Album, UserAlbum } from '../../core/models/album.interface';
import { ButtonModule } from 'primeng/button';
import { LoadingComponent } from '../../core/layout/loading/loading.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { userItemsTemplate } from '../../shared/templates/user-items.template';

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
export class AlbumComponent implements OnChanges {
  formBuilder = inject(FormBuilder);
  albumsService = inject(AlbumsService);
  usersService = inject(UsersService);

  @Input() albumData?: Album;
  @Input() userAlbumData?: UserAlbum;
  @Input() id?: string;

  albumForm: FormGroup = this.formBuilder.group(fillAlbumForm());
  selectItems = userItemsTemplate;

  ngOnChanges(changes: SimpleChanges) {
    this.albumForm = this.formBuilder.group(fillAlbumForm(this.userAlbumData));
  }

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
}
