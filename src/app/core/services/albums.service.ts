import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { UsersService } from './users.service';
import { AuthenticationService } from './authentication.service';
import { firstValueFrom, map } from 'rxjs';
import { Album, UserAlbum } from '../models/album.interface';
import { MediaCategory, MediaItem } from '../models/media.interface';

const ALBUMS_PATH = '/albums';

@Injectable({
  providedIn: 'root',
})
export class AlbumsService {
  albumsRef: AngularFirestoreCollection<Album>;
  constructor(
    private usersService: UsersService,
    private authenticationService: AuthenticationService,
    private db: AngularFirestore,
  ) {
    this.albumsRef = db.collection(ALBUMS_PATH);
  }

  async getSearchResults(query: string, filterSaved: boolean, uid: string) {
    let results = await firstValueFrom(
      this.db
        .collection<Album>(ALBUMS_PATH, (ref) => {
          if (query.trim() === '') {
            return ref.orderBy('title');
          }
          return ref.where('title', '==', query).orderBy('title');
        })
        .snapshotChanges()
        .pipe(
          map((albums) => {
            return albums.map(
              (album): MediaItem => ({
                id: album.payload.doc.id,
                category: MediaCategory.ALBUMS,
                ...album.payload.doc.data(),
              }),
            );
          }),
        ),
    );

    if (filterSaved) {
      results = results.filter((result) => !result.saved_by.includes(uid));
    }

    return results;
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
