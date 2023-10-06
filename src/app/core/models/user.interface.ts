import { UserGame } from './game.interface';
import { UserMovie } from './movie.interface';
import { UserAlbum } from './album.interface';
import { MediaRow } from './table.interface';

export interface User {
  collection: DatabaseUserCollection;
}

interface DatabaseUserCollection {
  games: UserGame[];
  movies: UserMovie[];
  albums: UserAlbum[];
}

export interface UserCollection {
  games: MediaRow[];
  movies: MediaRow[];
  albums: MediaRow[];
}
