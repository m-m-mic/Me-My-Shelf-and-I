import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { PaginatorModule } from 'primeng/paginator';
import { GamesService } from '../../services/games.service';
import { MoviesService } from '../../services/movies.service';
import { AlbumsService } from '../../services/albums.service';
import { GameCardComponent } from '../game-card/game-card.component';
import { GameWithId } from '../../models/game.interface';
import { ionClose } from '@ng-icons/ionicons';
import { InputSwitchModule } from 'primeng/inputswitch';

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

  @Input() mediaType: 'game' | 'movie' | 'album' = 'game';
  @Input() uid = '';
  searchFormControl = this.formBuilder.group({
    query: '',
    filterSaved: false,
  });
  results: GameWithId[] = [];

  ngOnInit() {
    this.getSearchResults();
  }

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

  get placeholder() {
    switch (this.mediaType) {
      case 'game':
        return 'Search for Games...';
      case 'movie':
        return 'Search for Movies...';
      case 'album':
        return 'Search for Albums...';
    }
  }

  toggleSavedFilter() {
    this.searchFormControl.controls['filterSaved'].setValue(
      !this.searchFormControl.controls['filterSaved'].value,
    );
  }

  get query() {
    return this.searchFormControl.controls['query'].value ?? '';
  }

  get filterSaved() {
    return this.searchFormControl.controls['filterSaved'].value ?? false;
  }

  async getSearchResults() {
    this.results = await this.gamesService.getSearchResults(
      this.query,
      this.filterSaved,
      this.uid,
    );
  }

  clearSearchInput() {
    this.searchFormControl.controls['query'].setValue('');
    this.getSearchResults();
  }
}
