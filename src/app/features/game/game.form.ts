import { GameType, UserGameType } from '../../core/models/game.interface';
import { FormGroup } from '@angular/forms';
import { DocumentReference } from '@angular/fire/compat/firestore';

export function createGameForm(
  inUserCollection: boolean,
  userGameData?: UserGameType,
) {
  if (userGameData) {
    return {
      format: [{ value: userGameData.format, disabled: !inUserCollection }],
      progress: [{ value: userGameData.progress, disabled: !inUserCollection }],
      notes: [{ value: userGameData.notes, disabled: !inUserCollection }],
    };
  } else {
    return {
      format: [{ value: 'physical', disabled: !inUserCollection }],
      progress: [{ value: 'not-started', disabled: !inUserCollection }],
      notes: [{ value: '', disabled: !inUserCollection }],
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
