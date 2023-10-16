import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchMedia, SearchState } from './search.state';

export const selectSearch = createFeatureSelector<SearchState>('search');

export const selectMediaState = (props: {
  media: 'games' | 'movies' | 'albums';
}) =>
  createSelector(selectSearch, (state): SearchMedia => {
    return state[props.media];
  });
