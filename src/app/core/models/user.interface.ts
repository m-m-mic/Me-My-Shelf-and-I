import { GameRow, UserGame } from './game.interface';
import { MovieRow, UserMovie } from './movie.interface';
import { AlbumRow, UserAlbum } from './album.interface';

export interface User {
  collection: DatabaseUserCollection;
}

interface DatabaseUserCollection {
  games: UserGame[];
  movies: UserMovie[];
  albums: UserAlbum[];
}

export interface UserCollection {
  games: GameRow[];
  movies: MovieRow[];
  albums: AlbumRow[];
}
