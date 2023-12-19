export interface MediaItem {
  id: string;
  title: string;
  category: MediaCategory;
  saved_by: string[];
  genres?: string[];
  runtime?: number;
  director?: string;
  platform?: string;
  artist?: string;
}

export enum MediaCategory {
  GAMES = 'games',
  MOVIES = 'movies',
  ALBUMS = 'albums',
}
