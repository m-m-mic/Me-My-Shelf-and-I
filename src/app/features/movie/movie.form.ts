import { FormGroup } from '@angular/forms';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { Movie, UserMovie } from '../../core/models/movie.interface';

export function fillMovieForm(userMovieData?: UserMovie) {
  if (userMovieData) {
    return {
      format: [
        { value: userMovieData.format, disabled: !userMovieData.in_collection },
      ],
      progress: [
        {
          value: userMovieData.progress,
          disabled: !userMovieData.in_collection,
        },
      ],
      notes: [
        { value: userMovieData.notes, disabled: !userMovieData.in_collection },
      ],
      added_on: [
        {
          value: userMovieData.added_on,
          disabled: !userMovieData.in_collection,
        },
      ],
      score: [
        {
          value: userMovieData.score ?? 0,
          disabled: !userMovieData.in_collection,
        },
      ],
    };
  } else {
    return {
      format: [{ value: 'physical', disabled: true }],
      progress: [{ value: 'not-started', disabled: true }],
      notes: [{ value: '', disabled: true }],
      added_on: [{ value: 0, disabled: true }],
      score: [{ value: 0, disabled: true }],
    };
  }
}

export function createMovieObject(
  ref: DocumentReference<Movie>,
  movieForm: FormGroup,
): UserMovie {
  return {
    ref: ref,
    in_collection: true,
    format: movieForm.value.format,
    progress: movieForm.value.progress,
    notes: movieForm.value.notes,
    added_on: movieForm.value.added_on,
    score: movieForm.value.score,
  };
}
