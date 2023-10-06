export interface Rating {
  item_id: string;
  user_id: string;
  score: number;
}

export interface Score {
  average: number;
  ratings: number;
}
