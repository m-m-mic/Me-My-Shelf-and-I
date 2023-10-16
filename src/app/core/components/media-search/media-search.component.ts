import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { PaginatorModule } from 'primeng/paginator';
import { CardComponent } from '../card/card.component';
import { ionClose } from '@ng-icons/ionicons';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MediaCategory, MediaItem } from '../../models/media.interface';
import { SearchService } from '../../services/search.service';

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
  ],
  templateUrl: './media-search.component.html',
  styleUrls: ['./media-search.component.scss'],
  viewProviders: [provideIcons({ ionClose })],
})
export class MediaSearchComponent implements OnInit {
  searchService = inject(SearchService);
  formBuilder = inject(FormBuilder);

  @Input() category: MediaCategory = MediaCategory.GAMES;
  @Input() uid = '';
  searchFormControl = this.formBuilder.group({
    query: '',
    filterSaved: false,
  });
  results: MediaItem[] = [];

  async ngOnInit() {
    const searchState = await this.searchService.getSearchMediaFromStore(
      this.category,
    );
    if (searchState) {
      this.results = searchState.results ?? [];
      this.searchFormControl.controls['query'].setValue(
        searchState.query ?? '',
      );
      this.searchFormControl.controls['filterSaved'].setValue(
        searchState.filterSaved ?? false,
      );
    } else {
      this.getSearchResults();
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

  async getSearchResults() {
    this.results = await this.searchService.getSearchResults(
      this.category,
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
