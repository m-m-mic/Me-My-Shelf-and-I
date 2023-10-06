import { DestroyRef, Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { UsersService } from './users.service';
import { AuthenticationService } from './authentication.service';
import { firstValueFrom, map } from 'rxjs';
import { Album, AlbumWithId, UserAlbum } from '../models/album.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const ALBUMS_PATH = '/albums';

@Injectable({
  providedIn: 'root',
})
export class AlbumsService {
  albumsRef: AngularFirestoreCollection<Album>;
  constructor(
    private usersService: UsersService,
    private authenticationService: AuthenticationService,
    private destroyRef: DestroyRef,
    private db: AngularFirestore,
  ) {
    this.albumsRef = db.collection(ALBUMS_PATH);
  }

  getAll() {
    return this.albumsRef.snapshotChanges().pipe(
      takeUntilDestroyed(this.destroyRef),
      map((albums) => {
        return albums.map(
          (game): AlbumWithId => ({
            id: game.payload.doc.id,
            ...game.payload.doc.data(),
          }),
        );
      }),
    );
  }

  get(id: string) {
    return this.albumsRef.doc(id).valueChanges();
  }

  async addUser(albumId: string) {
    const album = await firstValueFrom(this.get(albumId));
    const authUser = await firstValueFrom(this.authenticationService.getUser());

    if (!album || !authUser?.uid) {
      throw new Error('Could not find album or user');
    }

    const data = album;
    data.saved_by.push(authUser.uid);
    this.albumsRef.doc(albumId).update(data);
  }

  async removeUser(albumId: string) {
    const album = await firstValueFrom(this.get(albumId));
    const authUser = await firstValueFrom(this.authenticationService.getUser());

    if (!album || !authUser?.uid) {
      throw new Error('Could not find album or user');
    }

    const data = album;
    data.saved_by = data.saved_by.filter((id) => id !== authUser.uid);
    return this.albumsRef.doc(albumId).update(data);
  }

  saveToUserCollection(albumId: string) {
    const album: UserAlbum = {
      ref: this.albumsRef.doc(albumId).ref,
      in_collection: true,
      format: 'physical',
      progress: 'not-started',
      notes: '',
      added_on: new Date().getTime(),
      score: 0,
    };
    this.addUser(albumId);
    this.usersService.addAlbumToCollection(album);
  }

  removeFromUserCollection(albumId: string) {
    this.removeUser(albumId);
    this.usersService.removeAlbumFromCollection(albumId);
  }
}
