import { FormatType, ProgressType, RecordType } from './attribute.types';
import { DocumentReference } from '@angular/fire/compat/firestore';

export interface Album {
  title: string;
  artist: string;
  record?: RecordType;
  genres?: string[];
  saved_by: string[];
}

export interface AlbumWithId extends Album {
  id: string;
}

export interface UserAlbum {
  ref: DocumentReference<Album>;
  in_collection: boolean;
  progress: ProgressType;
  format: FormatType;
  notes: string;
  added_on: number;
}

export interface AlbumRow {
  id: string;
  title: string;
  artist: string;
  progress: string;
  format: string;
  added_on: number;
}
