type MediaColumn =
  | 'title'
  | 'format'
  | 'progress'
  | 'platform'
  | 'artist'
  | 'director'
  | 'none';

type MediaSortDirection = 'asc' | 'desc';

export interface MediaSort {
  column: MediaColumn;
  direction?: MediaSortDirection;
}
