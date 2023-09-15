import { DocumentReference } from '@angular/fire/compat/firestore';
import { FormatType, ProgressType } from './attribute.types';

export interface Movie {
  title: string;
  director?: string;
  genres?: string[];
  saved_by: number;
}

export interface MovieWithId extends Movie {
  id: string;
}

export interface UserMovie {
  ref: DocumentReference<Movie>;
  in_collection: boolean;
  progress?: ProgressType;
  format?: FormatType;
  notes?: string;
}

export interface CombinedMovie {
  general: Movie;
  user: UserMovie;
}
