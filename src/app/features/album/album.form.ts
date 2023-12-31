import { DocumentReference } from '@angular/fire/compat/firestore';
import { FormGroup, Validators } from '@angular/forms';
import { Album, UserAlbum } from '../../core/models/album.interface';

export function fillAlbumForm(userAlbumData?: UserAlbum) {
  if (userAlbumData) {
    return {
      format: [
        { value: userAlbumData.format, disabled: !userAlbumData.in_collection },
        Validators.required,
      ],
      progress: [
        {
          value: userAlbumData.progress,
          disabled: !userAlbumData.in_collection,
        },
        Validators.required,
      ],
      notes: [
        { value: userAlbumData.notes, disabled: !userAlbumData.in_collection },
      ],
      added_on: [
        {
          value: userAlbumData.added_on,
          disabled: !userAlbumData.in_collection,
        },
      ],
      score: [
        {
          value: userAlbumData.score ?? 0,
          disabled: !userAlbumData.in_collection,
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

export function createAlbumObject(
  ref: DocumentReference<Album>,
  albumForm: FormGroup,
): UserAlbum {
  return {
    ref: ref,
    in_collection: true,
    format: albumForm.value.format,
    progress: albumForm.value.progress,
    notes: albumForm.value.notes,
    added_on: albumForm.value.added_on,
    score: albumForm.value.score,
  };
}
