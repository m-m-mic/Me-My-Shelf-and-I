export interface Movie {
  title: string;
  director?: string;
}

export interface MovieWithId extends Movie {
  id: string;
}
