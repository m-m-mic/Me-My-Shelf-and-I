import { UserGameType } from '../../core/models/game.interface';

export function createGameForm(
  inUserCollection: boolean,
  userGameData?: UserGameType,
) {
  if (userGameData) {
    return {
      media: [{ value: userGameData.media, disabled: !inUserCollection }],
      progress: [{ value: userGameData.progress, disabled: !inUserCollection }],
      notes: [{ value: userGameData.notes, disabled: !inUserCollection }],
    };
  } else {
    return {
      media: [{ value: 'physical', disabled: !inUserCollection }],
      progress: [{ value: 'not-started', disabled: !inUserCollection }],
      notes: [{ value: '', disabled: !inUserCollection }],
    };
  }
}
