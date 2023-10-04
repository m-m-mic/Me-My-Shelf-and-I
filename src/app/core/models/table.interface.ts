export type MediaColumn =
  | 'title'
  | 'format'
  | 'progress'
  | 'platform'
  | 'artist'
  | 'director'
  | 'added_on';

type MediaSortDirection = 'asc' | 'desc';

export interface MediaSort {
  column: MediaColumn;
  direction?: MediaSortDirection;
}

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
