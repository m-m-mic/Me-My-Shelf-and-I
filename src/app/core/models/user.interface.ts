import { Game } from './game.interface';
import { Movie } from './movie.interface';
import { Music } from './music.interface';

export interface User {
  id?: string;
  collection: Collection;
}

interface Collection {
  games: Game[];
  movies: Movie[];
  music: Music[];
}
