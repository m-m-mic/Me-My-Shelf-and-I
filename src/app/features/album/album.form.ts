import { DocumentReference } from '@angular/fire/compat/firestore';
import { FormGroup } from '@angular/forms';
import { Album, UserAlbum } from '../../core/models/album.interface';

export function fillAlbumForm(userAlbumData?: UserAlbum) {
  if (userAlbumData) {
    return {
      format: [
        { value: userAlbumData.format, disabled: !userAlbumData.in_collection },
      ],
      notes: [
        { value: userAlbumData.notes, disabled: !userAlbumData.in_collection },
      ],
    };
  } else {
    return {
      format: [{ value: 'physical', disabled: true }],
      notes: [{ value: '', disabled: true }],
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
    notes: albumForm.value.notes,
  };
}
