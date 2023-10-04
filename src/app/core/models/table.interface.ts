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
