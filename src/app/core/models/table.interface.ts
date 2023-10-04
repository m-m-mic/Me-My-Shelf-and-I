export type MediaColumn =
  | 'title'
  | 'format'
  | 'progress'
  | 'platform'
  | 'artist'
  | 'director';

type MediaSortDirection = 'asc' | 'desc';

export interface MediaSort {
  column: MediaColumn;
  direction?: MediaSortDirection;
}
