import { Statistics } from '../../core/models/statistics.interface';

export function statisticsTemplate(): Statistics {
  return {
    amountInCollection: 0,
    time: 0,
    formatDistribution: {
      physical: 0,
      digital: 0,
    },
    progressDistribution: {
      notStarted: 0,
      inProgress: 0,
      completed: 0,
    },
  };
}
