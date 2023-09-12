import { MusicType } from './attribute.types';

export interface Music {
  id: string;
  name: string;
  artist: string;
  type?: MusicType;
}
