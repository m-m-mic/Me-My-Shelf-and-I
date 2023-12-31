import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { Movie } from '../../models/movie.interface';
import { Game } from '../../models/game.interface';
import { Album } from '../../models/album.interface';
import { LoadingComponent } from '../../layout/loading/loading.component';
import { ScoreComponent } from '../score/score.component';
import { Score } from '../../models/rating.interface';
import { GamesService } from '../../services/games.service';
import { MoviesService } from '../../services/movies.service';
import { AlbumsService } from '../../services/albums.service';
import { ionAdd, ionBookmark, ionRemove } from '@ng-icons/ionicons';

@Component({
  selector: 'app-media-data',
  standalone: true,
  imports: [CommonModule, NgIconComponent, LoadingComponent, ScoreComponent],
  templateUrl: './media-data.component.html',
  styleUrls: ['./media-data.component.scss'],
  viewProviders: [provideIcons({ ionAdd, ionRemove, ionBookmark })],
})
export class MediaDataComponent {
  gamesService = inject(GamesService);
  moviesService = inject(MoviesService);
  albumsService = inject(AlbumsService);

  @Input() data?: Game | Movie | Album;
  @Input() inCollection?: boolean;
  @Input() score?: Score;
  @Input() id?: string;
  @Input() mediaType: 'game' | 'movie' | 'album' = 'game';

  get mediaService() {
    switch (this.mediaType) {
      case 'game':
        return this.gamesService;
      case 'movie':
        return this.moviesService;
      case 'album':
        return this.albumsService;
    }
  }

  addToCollection() {
    if (!this.id) {
      return;
    }
    this.mediaService.saveToUserCollection(this.id);
  }

  removeFromCollection() {
    if (!this.id) {
      return;
    }
    this.mediaService.removeFromUserCollection(this.id);
  }
}
