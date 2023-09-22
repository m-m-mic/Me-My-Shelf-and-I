import { UserStatistics } from '../../core/models/user.interface';

export function userStatisticsTemplate(): UserStatistics {
  return {
    games: {
      amountInCollection: 0,
      formatDistribution: {
        physical: 0,
        digital: 0,
      },
      progressDistribution: {
        notStarted: 0,
        inProgress: 0,
        completed: 0,
      },
    },
    movies: {
      amountInCollection: 0,
      formatDistribution: {
        physical: 0,
        digital: 0,
      },
      progressDistribution: {
        notStarted: 0,
        inProgress: 0,
        completed: 0,
      },
    },
    albums: {
      amountInCollection: 0,
      formatDistribution: {
        physical: 0,
        digital: 0,
      },
    },
  };
}
