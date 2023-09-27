import { FormatType, ProgressType } from '../../core/models/attribute.types';

export function convertFormat(format: FormatType) {
  switch (format) {
    case 'digital':
      return 'Digital';
    case 'physical':
      return 'Physical';
  }
}

export function convertProgress(progress: ProgressType) {
  switch (progress) {
    case 'not-started':
      return 'Not Started';
    case 'in-progress':
      return 'In Progress';
    case 'completed':
      return 'Completed';
  }
}
