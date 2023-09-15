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
  progress?: ProgressType;
  format?: FormatType;
  notes?: string;
}

export interface CombinedGame {
  general: GameWithId;
  user: UserGame;
}
