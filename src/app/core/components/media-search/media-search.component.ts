import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { PaginatorModule } from 'primeng/paginator';
import { GamesService } from '../../services/games.service';
import { MoviesService } from '../../services/movies.service';
import { AlbumsService } from '../../services/albums.service';
import { GameCardComponent } from '../game-card/game-card.component';
import { GameWithId } from '../../models/game.interface';
import { ionClose } from '@ng-icons/ionicons';
import { InputSwitchModule } from 'primeng/inputswitch';
import { Store } from '@ngrx/store';
import { setSearchMediaState } from '../../states/search/search.actions';
import { selectMediaState } from '../../states/search/search.selectors';
import { firstValueFrom, take, tap } from 'rxjs';

@Component({
  selector: 'app-media-search',
  standalone: true,
  imports: [
    CommonModule,
    NgIcon,
    PaginatorModule,
    ReactiveFormsModule,
    GameCardComponent,
    InputSwitchModule,
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

  @Input() mediaType: 'games' | 'movies' | 'albums' = 'games';
  @Input() uid = '';
  searchFormControl = this.formBuilder.group({
    query: '',
    filterSaved: false,
  });
  results: GameWithId[] = [];

  ngOnInit() {
    this.getSearchMediaFromStore();
  }

  get mediaService() {
    switch (this.mediaType) {
      case 'games':
        return this.gamesService;
      case 'movies':
        return this.moviesService;
      case 'albums':
        return this.albumsService;
    }
  }

  get placeholder() {
    switch (this.mediaType) {
      case 'games':
        return 'Search for Games...';
      case 'movies':
        return 'Search for Movies...';
      case 'albums':
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
      this.store.select(selectMediaState({ media: this.mediaType })),
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
      setSearchMediaState({ media: this.mediaType, mediaState }),
    );
  }

  clearSearchInput() {
    this.searchFormControl.controls['query'].setValue('');
    this.getSearchResults();
  }
}
