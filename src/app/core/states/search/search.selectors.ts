import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchMedia, SearchState } from './search.state';
import { MediaCategory } from '../../models/media.interface';

export const selectSearch = createFeatureSelector<SearchState>('search');

export const selectMediaState = (props: { media: MediaCategory }) =>
  createSelector(selectSearch, (state): SearchMedia => {
    return state[props.media];
  });
