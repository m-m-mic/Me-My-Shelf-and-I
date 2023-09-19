import { CombinedGame, UserGame } from './game.interface';
import { CombinedMovie, UserMovie } from './movie.interface';
import { CombinedAlbum, UserAlbum } from './album.interface';

export interface User {
  collection: InternalCollection;
}

interface InternalCollection {
  games: UserGame[];
  movies: UserMovie[];
  albums: UserAlbum[];
}

export interface UserCollection {
  games: CombinedGame[];
  movies: CombinedMovie[];
  albums: CombinedAlbum[];
}
