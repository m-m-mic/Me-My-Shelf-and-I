import { MediaItem } from '../../models/media.interface';

export interface SearchState {
  games: SearchMedia;
  movies: SearchMedia;
  albums: SearchMedia;
}

export const initialSearchState = {
  games: {},
  movies: {},
  albums: {},
};

export interface SearchMedia {
  query?: string;
  filterSaved?: boolean;
  results?: MediaItem[];
}
