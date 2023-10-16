import { GameWithId } from '../../models/game.interface';
import { MovieWithId } from '../../models/movie.interface';
import { AlbumWithId } from '../../models/album.interface';

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
  results?: GameWithId[] | MovieWithId[] | AlbumWithId[];
}
