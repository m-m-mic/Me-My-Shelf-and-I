import { DestroyRef, Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { UsersService } from './users.service';
import { AuthenticationService } from './authentication.service';
import { firstValueFrom, map, throwError } from 'rxjs';
import { Album, AlbumWithId, UserAlbum } from '../models/album.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AlbumsService {
  private albumsPath = '/albums';
  albumsRef: AngularFirestoreCollection<Album>;
  constructor(
    private usersService: UsersService,
    private authenticationService: AuthenticationService,
    private destroyRef: DestroyRef,
    private db: AngularFirestore,
  ) {
    this.albumsRef = db.collection(this.albumsPath);
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
      throwError(() => new Error('Could not find album or user'));
      return;
    }

    const data = album;
    data.saved_by.push(authUser.uid);
    await this.albumsRef.doc(albumId).update(data);
  }

  async removeUser(albumId: string) {
    const album = await firstValueFrom(this.get(albumId));
    const authUser = await firstValueFrom(this.authenticationService.getUser());

    if (!album || !authUser?.uid) {
      throwError(() => new Error('Could not find album or user'));
      return;
    }

    const data = album;
    data.saved_by = data.saved_by.filter((id) => id !== authUser.uid);
    return this.albumsRef.doc(albumId).update(data);
  }

  async saveToUserCollection(albumId: string) {
    const album: UserAlbum = {
      ref: this.albumsRef.doc(albumId).ref,
      in_collection: true,
      format: 'physical',
      notes: '',
    };
    await this.addUser(albumId);
    await this.usersService.addAlbumToCollection(album);
  }

  async removeFromUserCollection(albumId: string) {
    await this.removeUser(albumId);
    await this.usersService.removeAlbumFromCollection(albumId);
  }
}
