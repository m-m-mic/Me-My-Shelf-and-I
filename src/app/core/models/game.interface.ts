import { FormatType, ProgressType } from './attribute.types';
import { DocumentReference } from '@angular/fire/compat/firestore';

export interface Game {
  title: string;
  platform?: string;
  first_release?: string;
  genres?: string[];
  saved_by: string[];
}

export interface GameWithId extends Game {
  id: string;
}

export interface UserGame {
  ref: DocumentReference<Game>;
  in_collection: boolean;
  progress: ProgressType;
  format: FormatType;
  notes: string;
  added_on: number;
  playtime?: number;
  score?: number;
}

export interface GameRow {
  id: string;
  title: string;
  platform: string;
  progress: string;
  format: string;
  added_on: number;
  time: number;
}
