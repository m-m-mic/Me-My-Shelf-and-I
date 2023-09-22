import { DocumentReference } from '@angular/fire/compat/firestore';
import { FormatType, ProgressType } from './attribute.types';

export interface Movie {
  title: string;
  director?: string;
  genres?: string[];
  saved_by: string[];
}

export interface MovieWithId extends Movie {
  id: string;
}

export interface UserMovie {
  ref: DocumentReference<Movie>;
  in_collection: boolean;
  progress: ProgressType;
  format: FormatType;
  notes: string;
  added_on: number;
}

export interface MovieRow {
  id: string;
  title: string;
  director: string;
  progress: string;
  format: string;
  added_on: number;
}
