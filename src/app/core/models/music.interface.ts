import { MusicType } from './attribute.types';

export interface Music {
  title: string;
  artist: string;
  type?: MusicType;
}

export interface MusicWithId extends Music {
  id: string;
}
