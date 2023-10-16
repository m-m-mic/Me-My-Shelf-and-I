import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { PaginatorModule } from 'primeng/paginator';
import { GamesService } from '../../services/games.service';
import { MoviesService } from '../../services/movies.service';
import { AlbumsService } from '../../services/albums.service';
import { CardComponent } from '../card/card.component';
import { ionClose } from '@ng-icons/ionicons';
import { InputSwitchModule } from 'primeng/inputswitch';
import { Store } from '@ngrx/store';
import { setSearchMediaState } from '../../states/search/search.actions';
import { selectMediaState } from '../../states/search/search.selectors';
import { firstValueFrom } from 'rxjs';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { AlbumCardComponent } from '../album-card/album-card.component';
import { MediaCategory, MediaItem } from '../../models/media.interface';

@Component({
  selector: 'app-media-search',
  standalone: true,
  imports: [
    CommonModule,
    NgIcon,
    PaginatorModule,
    ReactiveFormsModule,
    CardComponent,
    InputSwitchModule,
    MovieCardComponent,
    AlbumCardComponent,
  ],
  templateUrl: './media-search.component.html',
  styleUrls: ['./media-search.component.scss'],
  viewProviders: [provideIcons({ ionClose })],
})
export class MediaSearchComponent implements OnInit {
  gamesService = inject(GamesService);
  moviesService = inject(MoviesService);
  albumsService = inject(AlbumsService);
  formBuilder = inject(FormBuilder);
  store = inject(Store);

  @Input() category: MediaCategory = MediaCategory.GAMES;
  @Input() uid = '';
  searchFormControl = this.formBuilder.group({
    query: '',
    filterSaved: false,
  });
  results: MediaItem[] = [];

  ngOnInit() {
    this.getSearchMediaFromStore();
  }

  get mediaService() {
    switch (this.category) {
      case MediaCategory.GAMES:
        return this.gamesService;
      case MediaCategory.MOVIES:
        return this.moviesService;
      case MediaCategory.ALBUMS:
        return this.albumsService;
    }
  }

  get placeholder() {
    switch (this.category) {
      case MediaCategory.GAMES:
        return 'Search for Games...';
      case MediaCategory.MOVIES:
        return 'Search for Movies...';
      case MediaCategory.ALBUMS:
        return 'Search for Albums...';
    }
  }

  get query() {
    return this.searchFormControl.controls['query'].value ?? '';
  }

  get filterSaved() {
    return this.searchFormControl.controls['filterSaved'].value ?? false;
  }

  async getSearchMediaFromStore() {
    const state = await firstValueFrom(
      this.store.select(selectMediaState({ media: this.category })),
    );
    if (
      state.filterSaved !== undefined &&
      state.query !== undefined &&
      state.results
    ) {
      this.searchFormControl.controls['query'].setValue(state.query);
      this.searchFormControl.controls['filterSaved'].setValue(
        state.filterSaved,
      );
      this.results = state.results;
    } else {
      this.getSearchResults();
    }
  }

  async getSearchResults() {
    this.results = await this.gamesService.getSearchResults(
      this.query,
      this.filterSaved,
      this.uid,
    );

    const mediaState = {
      query: this.query,
      filterSaved: this.filterSaved,
      results: this.results,
    };

    this.store.dispatch(
      setSearchMediaState({ category: this.category, mediaState }),
    );
  }

  clearSearchInput() {
    this.searchFormControl.controls['query'].setValue('');
    this.getSearchResults();
  }
}
