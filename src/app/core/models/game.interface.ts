import { FormatType, ProgressType } from './attribute.types';
import { DocumentReference } from '@angular/fire/compat/firestore';

export interface GameType {
  title: string;
  platform?: string;
  first_release?: string;
  saved_by: number;
}

export interface GameTypeWithId extends GameType {
  id: string;
}

export interface UserGameType {
  ref: DocumentReference<GameType>;
  in_collection: boolean;
  progress?: ProgressType;
  media?: FormatType;
}

export interface CombinedGameType {
  general: GameType;
  user: UserGameType;
}
