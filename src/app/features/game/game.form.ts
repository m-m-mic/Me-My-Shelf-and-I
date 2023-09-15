import { GameType, UserGameType } from '../../core/models/game.interface';
import { FormGroup } from '@angular/forms';
import { DocumentReference } from '@angular/fire/compat/firestore';

export function fillGameForm(userGameData?: UserGameType) {
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
    };
  } else {
    return {
      format: [{ value: 'physical', disabled: true }],
      progress: [{ value: 'not-started', disabled: true }],
      notes: [{ value: '', disabled: true }],
    };
  }
}

export function createGameObject(
  ref: DocumentReference<GameType>,
  gameForm: FormGroup,
): UserGameType {
  return {
    ref: ref,
    in_collection: true,
    format: gameForm.value.format,
    progress: gameForm.value.progress,
    notes: gameForm.value.notes,
  };
}
