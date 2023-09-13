import { FormatType, ProgressType } from './attribute.types';
import { DocumentReference } from '@angular/fire/compat/firestore';

export interface GameType {
  title: string;
  platform?: string;
  first_release?: string;
  genres?: string[];
  saved_by: string[];
}

export interface GameWithIdType extends GameType {
  id: string;
}

export interface UserGameType {
  ref: DocumentReference<GameType>;
  in_collection: boolean;
  progress?: ProgressType;
  media?: FormatType;
  notes?: string;
}

export interface CombinedGameType {
  general: GameWithIdType;
  user: UserGameType;
}
