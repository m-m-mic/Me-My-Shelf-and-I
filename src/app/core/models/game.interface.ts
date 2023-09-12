import { Media, Progress } from './attribute.types';

export interface Game {
  id: string;
  name: string;
  platform?: string;
  media?: Media;
  progress?: Progress;
  saved_by: number;
}
