import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { UsersService } from './users.service';
import { AuthenticationService } from './authentication.service';
import { firstValueFrom, throwError } from 'rxjs';
import { Album, AlbumWithId, UserAlbum } from '../models/album.interface';

@Injectable({
  providedIn: 'root',
})
export class AlbumsService {
  private albumsPath = '/albums';
  albumsRef: AngularFirestoreCollection<Album>;
  constructor(
    private usersService: UsersService,
    private authenticationService: AuthenticationService,
    private db: AngularFirestore,
  ) {
    this.albumsRef = db.collection(this.albumsPath);
  }

  async getAll() {
    const albums = await firstValueFrom(this.albumsRef.snapshotChanges());
    const albumsWithId: AlbumWithId[] = [];
    albums.map((album) => {
      albumsWithId.push({
        id: album.payload.doc.id,
        ...album.payload.doc.data(),
      });
    });
    return albumsWithId;
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
