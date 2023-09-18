import { FormatType, RecordType } from './attribute.types';
import { DocumentReference } from '@angular/fire/compat/firestore';

export interface Album {
  title: string;
  artist: string;
  record?: RecordType;
  genres?: string[];
  saved_by: number;
}

export interface AlbumWithId extends Album {
  id: string;
}

export interface UserAlbum {
  ref: DocumentReference<Album>;
  in_collection: boolean;
  format?: FormatType;
  notes?: string;
}

export interface CombinedAlbum {
  general: Album;
  user: UserAlbum;
}
