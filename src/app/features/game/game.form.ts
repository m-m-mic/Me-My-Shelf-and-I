import { Game, UserGame } from '../../core/models/game.interface';
import { FormGroup } from '@angular/forms';
import { DocumentReference } from '@angular/fire/compat/firestore';

export function fillGameForm(userGameData?: UserGame) {
  if (userGameData) {
    return {
      format: [
        { value: userGameData.format, disabled: !userGameData.in_collection },
      ],
      progress: [
        { value: userGameData.progress, disabled: !userGameData.in_collection },
      ],
      notes: [
        { value: userGameData.notes, disabled: !userGameData.in_collection },
      ],
      added_on: [
        { value: userGameData.added_on, disabled: !userGameData.in_collection },
      ],
      score: [
        {
          value: userGameData.score ?? 0,
          disabled: !userGameData.in_collection,
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

export function createGameObject(
  ref: DocumentReference<Game>,
  gameForm: FormGroup,
): UserGame {
  return {
    ref: ref,
    in_collection: true,
    format: gameForm.value.format,
    progress: gameForm.value.progress,
    notes: gameForm.value.notes,
    added_on: gameForm.value.added_on,
    score: gameForm.value.score,
  };
}
