import { createReducer, on } from '@ngrx/store';
import { initialSearchState, SearchState } from './search.state';
import {
  clearSearchMediaState,
  clearSearchState,
  setSearchMediaState,
} from './search.actions';

export const searchReducer = createReducer(
  initialSearchState,
  on(setSearchMediaState, (state, { category, mediaState }): SearchState => {
    const oldState = structuredClone(state);
    oldState[category] = mediaState;
    return oldState;
  }),
  on(clearSearchMediaState, (state, { category }): SearchState => {
    const oldState = structuredClone(state);
    oldState[category] = {};
    return oldState;
  }),
  on(clearSearchState, (): SearchState => initialSearchState),
);
