import { DocumentReference } from '@angular/fire/compat/firestore';
import { FormatType, ProgressType } from './attribute.types';

export interface MovieType {
  title: string;
  director?: string;
  genres?: string[];
  saved_by: number;
}

export interface MovieWithIdType extends MovieType {
  id: string;
}

export interface UserMovieType {
  ref: DocumentReference<MovieType>;
  in_collection: boolean;
  progress?: ProgressType;
  format?: FormatType;
  notes?: string;
}

export interface CombinedMovieType {
  general: MovieType;
  user: UserMovieType;
}
