import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumCardComponent } from '../../core/components/album-card/album-card.component';
import { AlbumWithId } from '../../core/models/album.interface';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule, AlbumCardComponent],
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent {
  @Input() albumsList: AlbumWithId[] = [];
  @Input() uid = '';
}
