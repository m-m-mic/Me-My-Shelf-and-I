import { GameRow, UserGame } from './game.interface';
import { CombinedMovie, UserMovie } from './movie.interface';
import { CombinedAlbum, UserAlbum } from './album.interface';

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
  movies: CombinedMovie[];
  albums: CombinedAlbum[];
}

export interface UserStatistics {
  games: GamesStatistics;
  movies: MoviesStatistics;
  albums: Statistics;
}

interface Statistics {
  amountInCollection: number;
  formatDistribution: FormatDistribution;
}

export interface GamesStatistics extends Statistics {
  progressDistribution: ProgressDistribution;
}

interface MoviesStatistics extends Statistics {
  progressDistribution: ProgressDistribution;
}

interface FormatDistribution {
  digital: number;
  physical: number;
}

interface ProgressDistribution {
  notStarted: number;
  inProgress: number;
  completed: number;
}
