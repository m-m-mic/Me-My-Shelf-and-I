export interface UserStatistics {
  games: Statistics;
  movies: Statistics;
  albums: Statistics;
}

export interface Statistics {
  amountInCollection: number;
  formatDistribution: FormatDistribution;
  progressDistribution: ProgressDistribution;
}

interface FormatDistribution {
  digital: number;
  physical: number;
}

interface ProgressDistribution {
  notStarted: number;
  inProgress: number;
  completed: number;
}
