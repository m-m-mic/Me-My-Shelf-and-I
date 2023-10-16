import { createAction, props } from '@ngrx/store';
import { SearchMedia } from './search.state';
import { MediaCategory } from '../../models/media.interface';

export const setSearchMediaState = createAction(
  '[Search] Set Search Media State',
  props<{ category: MediaCategory; mediaState: SearchMedia }>(),
);

export const clearSearchMediaState = createAction(
  '[Search] Clear Search Media State',
  props<{ category: MediaCategory }>(),
);

export const clearSearchState = createAction('[Search] Clear Search State');
