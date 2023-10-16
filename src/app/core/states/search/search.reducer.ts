import { createReducer, on } from '@ngrx/store';
import { initialSearchState, SearchState } from './search.state';
import {
  clearSearchMediaState,
  clearSearchState,
  setSearchMediaState,
} from './search.actions';

export const searchReducer = createReducer(
  initialSearchState,
  on(setSearchMediaState, (state, { media, mediaState }): SearchState => {
    const oldState = structuredClone(state);
    oldState[media] = mediaState;
    return oldState;
  }),
  on(clearSearchMediaState, (state, { media }): SearchState => {
    const oldState = structuredClone(state);
    oldState[media] = {};
    return oldState;
  }),
  on(clearSearchState, (): SearchState => initialSearchState),
);
