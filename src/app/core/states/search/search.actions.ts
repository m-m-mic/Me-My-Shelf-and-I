import { createAction, props } from '@ngrx/store';
import { SearchMedia } from './search.state';

export const setSearchMediaState = createAction(
  '[Search] Set Search Media State',
  props<{ media: 'games' | 'movies' | 'albums'; mediaState: SearchMedia }>(),
);

export const clearSearchMediaState = createAction(
  '[Search] Clear Search Media State',
  props<{ media: 'games' | 'movies' | 'albums' }>(),
);

export const clearSearchState = createAction('[Search] Clear Search State');
