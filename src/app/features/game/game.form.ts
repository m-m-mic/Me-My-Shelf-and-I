import { Game, UserGame } from '../../core/models/game.interface';
import { FormGroup, Validators } from '@angular/forms';
import { DocumentReference } from '@angular/fire/compat/firestore';

export function fillGameForm(userGameData?: UserGame) {
  if (userGameData) {
    return {
      format: [
        { value: userGameData.format, disabled: !userGameData.in_collection },
        Validators.required,
      ],
      progress: [
        { value: userGameData.progress, disabled: !userGameData.in_collection },
        Validators.required,
      ],
      notes: [
        { value: userGameData.notes, disabled: !userGameData.in_collection },
      ],
      playtime: [
        {
          value: userGameData.playtime ? userGameData.playtime / 60 : 0,
          disabled: !userGameData.in_collection,
        },
        [Validators.min(0), Validators.required],
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
      playtime: [{ value: 0, disabled: true }],
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
    playtime: gameForm.value.playtime * 60,
    notes: gameForm.value.notes,
    added_on: gameForm.value.added_on,
    score: gameForm.value.score,
  };
}
