import { RecordType } from './attribute.types';

export interface Music {
  title: string;
  artist: string;
  record?: RecordType;
  genres?: string[];
  saved_by: number;
}

export interface MusicWithId extends Music {
  id: string;
}
