import { DocumentReference } from '@angular/fire/compat/firestore';
import { FormatType, ProgressType } from './attribute.types';

export interface Movie {
  title: string;
  director?: string;
  genres?: string[];
  runtime?: number;
  saved_by: string[];
}

export interface UserMovie {
  ref: DocumentReference<Movie>;
  in_collection: boolean;
  progress: ProgressType;
  format: FormatType;
  notes: string;
  added_on: number;
  score?: number;
}
