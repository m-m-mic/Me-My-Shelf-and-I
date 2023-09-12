import { FormatType, ProgressType } from './attribute.types';

export interface Game {
  title: string;
  platform?: string;
  media?: FormatType;
  progress?: ProgressType;
  saved_by: number;
}

export interface GameWithId extends Game {
  id: string;
}
