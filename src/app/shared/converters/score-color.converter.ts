export function convertScoreToColor(score: number) {
  if (score >= 1 && score < 5) {
    return 'poor';
  } else if (score >= 5 && score < 7) {
    return 'average';
  } else if (score >= 7) {
    return 'good';
  } else {
    return '';
  }
}
