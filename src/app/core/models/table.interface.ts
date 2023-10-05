export interface MediaSort {
  column: MediaSortColumn;
  direction?: MediaSortDirection;
}

export type MediaSortColumn =
  | 'title'
  | 'format'
  | 'progress'
  | 'platform'
  | 'artist'
  | 'director'
  | 'added_on';

type MediaSortDirection = 'asc' | 'desc';

export interface MediaRow {
  id: string;
  title: string;
  progress: string;
  format: string;
  added_on: number;
  director?: string;
  artist?: string;
  platform?: string;
}
