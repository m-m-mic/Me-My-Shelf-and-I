import { inject, Injectable } from '@angular/core';
import { GamesService } from './games.service';
import { MoviesService } from './movies.service';
import { AlbumsService } from './albums.service';
import { MediaCategory } from '../models/media.interface';
import { firstValueFrom } from 'rxjs';
import { selectMediaState } from '../states/search/search.selectors';
import { Store } from '@ngrx/store';
import { setSearchMediaState } from '../states/search/search.actions';
import { SearchMedia } from '../states/search/search.state';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  gamesService = inject(GamesService);
  moviesService = inject(MoviesService);
  albumsService = inject(AlbumsService);
  store = inject(Store);

  getMediaService(category: MediaCategory) {
    switch (category) {
      case MediaCategory.GAMES:
        return this.gamesService;
      case MediaCategory.MOVIES:
        return this.moviesService;
      case MediaCategory.ALBUMS:
        return this.albumsService;
    }
  }

  async getSearchMediaFromStore(category: MediaCategory) {
    const state = await firstValueFrom(
      this.store.select(selectMediaState({ media: category })),
    );
    if (
      state.filterSaved !== undefined &&
      state.query !== undefined &&
      state.results
    ) {
      return state;
    } else {
      return;
    }
  }

  async getSearchResults(
    category: MediaCategory,
    query: string,
    filterSaved: boolean,
    uid: string,
  ) {
    const results = await this.getMediaService(category).getSearchResults(
      query,
      filterSaved,
      uid,
    );

    const mediaState: SearchMedia = {
      query: query,
      filterSaved: filterSaved,
      results: results,
    };

    this.store.dispatch(
      setSearchMediaState({ category: category, mediaState }),
    );

    return results;
  }
}
