import { DestroyRef, Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { User, UserCollection, UserStatistics } from '../models/user.interface';
import { firstValueFrom, map, of, switchMap, take } from 'rxjs';
import { GameWithId, UserGame } from '../models/game.interface';
import { AuthenticationService } from './authentication.service';
import { MovieWithId, UserMovie } from '../models/movie.interface';
import { AlbumWithId, UserAlbum } from '../models/album.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { userStatisticsTemplate } from '../../shared/templates/user-statistics.template';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersPath = '/users';
  usersRef: AngularFirestoreCollection<User>;

  constructor(
    private db: AngularFirestore,
    private authenticationService: AuthenticationService,
    private destroyRef: DestroyRef,
  ) {
    this.usersRef = db.collection(this.usersPath);
  }

  get() {
    return this.authenticationService.authUser$.pipe(
      take(1),
      switchMap((user) => {
        if (user) {
          return this.usersRef.doc(user.uid).valueChanges();
        } else {
          return of(undefined);
        }
      }),
    );
  }

  async getUserData() {
    const user = await firstValueFrom(this.get());
    const authUser = await firstValueFrom(this.authenticationService.authUser$);

    if (!user || !authUser) {
      throw new Error('Could not find user');
    }
    return { uid: authUser.uid, document: user };
  }

  create(id: string) {
    return this.usersRef
      .doc(id)
      .set({ collection: { games: [], movies: [], albums: [] } });
  }

  async getCollection() {
    const userData = await this.getUserData();
    if (!userData) return;

    const collection: UserCollection = {
      games: [],
      movies: [],
      albums: [],
    };

    for (const game of userData.document.collection.games) {
      const gameData = await game.ref.get();
      if (game.in_collection) {
        collection.games.push({
          general: {
            ...gameData.data(),
            id: game.ref.id,
          } as GameWithId,
          user: game,
        });
      }
    }

    for (const movie of userData.document.collection.movies) {
      const movieData = await movie.ref.get();
      if (movie.in_collection) {
        collection.movies.push({
          general: {
            ...movieData.data(),
            id: movie.ref.id,
          } as MovieWithId,
          user: movie,
        });
      }
    }

    for (const album of userData.document.collection.albums) {
      const albumData = await album.ref.get();
      if (album.in_collection) {
        collection.albums.push({
          general: {
            ...albumData.data(),
            id: album.ref.id,
          } as AlbumWithId,
          user: album,
        });
      }
    }

    return collection;
  }

  getStatistics(collection: UserCollection) {
    const userStatistics = userStatisticsTemplate;
    collection.games.map((game) => {
      userStatistics.games.amountInCollection++;
      switch (game.user.format) {
        case 'physical':
          userStatistics.games.formatDistribution.physical++;
          break;
        case 'digital':
          userStatistics.games.formatDistribution.digital++;
          break;
      }
      switch (game.user.progress) {
        case 'not-started':
          userStatistics.games.progressDistribution.notStarted++;
          break;
        case 'in-progress':
          userStatistics.games.progressDistribution.inProgress++;
          break;
        case 'completed':
          userStatistics.games.progressDistribution.completed++;
      }
    });

    collection.movies.map((movie) => {
      userStatistics.movies.amountInCollection++;
      switch (movie.user.format) {
        case 'physical':
          userStatistics.movies.formatDistribution.physical++;
          break;
        case 'digital':
          userStatistics.movies.formatDistribution.digital++;
          break;
      }
      switch (movie.user.progress) {
        case 'not-started':
          userStatistics.movies.progressDistribution.notStarted++;
          break;
        case 'in-progress':
          userStatistics.movies.progressDistribution.inProgress++;
          break;
        case 'completed':
          userStatistics.movies.progressDistribution.completed++;
      }
    });

    collection.albums.map((album) => {
      userStatistics.albums.amountInCollection++;
      switch (album.user.format) {
        case 'physical':
          userStatistics.albums.formatDistribution.physical++;
          break;
        case 'digital':
          userStatistics.albums.formatDistribution.digital++;
          break;
      }
    });

    return userStatistics;
  }

  // Games Collection methods
  getUserGame(gameId: string) {
    return this.get().pipe(
      takeUntilDestroyed(this.destroyRef),
      map((user) => {
        if (user) {
          for (const game of user.collection.games) {
            if (game.ref.id === gameId) {
              return game;
            }
          }
        }
        return undefined;
      }),
    );
  }

  async addGameToCollection(gameData: UserGame) {
    const userData = await this.getUserData();
    if (!userData) return;

    const data = userData.document;
    const gamesCollection = data.collection.games;
    let isInArray = false;
    for (let i = 0; i < gamesCollection.length; i++) {
      if (gameData.ref.id == gamesCollection[i].ref.id) {
        gamesCollection[i].in_collection = true;
        isInArray = true;
        break;
      }
    }
    if (!isInArray) gamesCollection.push(gameData);
    data.collection.games = gamesCollection;
    return this.usersRef.doc(userData.uid).update(data);
  }

  async updateGameFromCollection(gameData: UserGame) {
    const userData = await this.getUserData();
    if (!userData) return;

    const data = userData.document;
    const gamesCollection = data.collection.games;
    for (let i = 0; i < gamesCollection.length; i++) {
      if (gameData.ref.id == gamesCollection[i].ref.id) {
        gamesCollection[i] = gameData;
        break;
      }
    }
    data.collection.games = gamesCollection;
    return this.usersRef.doc(userData.uid).update(data);
  }

  async removeGameFromCollection(gameId: string) {
    const userData = await this.getUserData();
    if (!userData) return;

    const data = userData.document;
    const gamesCollection = [];
    for (let i = 0; i < data.collection.games.length; i++) {
      if (gameId != data.collection.games[i].ref.id) {
        gamesCollection.push(data.collection.games[i]);
      } else {
        const updatedGame: UserGame = {
          ...data.collection.games[i],
          in_collection: false,
        };
        gamesCollection.push(updatedGame);
      }
    }
    data.collection.games = gamesCollection;
    return this.usersRef.doc(userData.uid).update(data);
  }

  // Movie Collection methods
  getUserMovie(movieId: string) {
    return this.get().pipe(
      takeUntilDestroyed(this.destroyRef),
      map((user) => {
        if (user) {
          for (const movie of user.collection.movies) {
            if (movie.ref.id === movieId) {
              return movie;
            }
          }
        }
        return undefined;
      }),
    );
  }

  async addMovieToCollection(movieData: UserMovie) {
    const userData = await this.getUserData();
    if (!userData) return;

    const data = userData.document;
    const moviesCollection = data.collection.movies;
    let isInArray = false;
    for (let i = 0; i < moviesCollection.length; i++) {
      if (movieData.ref.id == moviesCollection[i].ref.id) {
        moviesCollection[i].in_collection = true;
        isInArray = true;
        break;
      }
    }
    if (!isInArray) moviesCollection.push(movieData);
    data.collection.movies = moviesCollection;
    return this.usersRef.doc(userData.uid).update(data);
  }

  async updateMovieFromCollection(movieData: UserMovie) {
    const userData = await this.getUserData();
    if (!userData) return;

    const data = userData.document;
    const moviesCollection = data.collection.movies;
    for (let i = 0; i < moviesCollection.length; i++) {
      if (movieData.ref.id == moviesCollection[i].ref.id) {
        moviesCollection[i] = movieData;
        break;
      }
    }
    data.collection.movies = moviesCollection;
    return this.usersRef.doc(userData.uid).update(data);
  }

  async removeMovieFromCollection(movieId: string) {
    const userData = await this.getUserData();
    if (!userData) return;

    const data = userData.document;
    const moviesCollection = [];
    for (let i = 0; i < data.collection.movies.length; i++) {
      if (movieId != data.collection.movies[i].ref.id) {
        moviesCollection.push(data.collection.movies[i]);
      } else {
        const updatedMovie: UserMovie = {
          ...data.collection.movies[i],
          in_collection: false,
        };
        moviesCollection.push(updatedMovie);
      }
    }
    data.collection.movies = moviesCollection;
    return this.usersRef.doc(userData.uid).update(data);
  }

  // Album Collection methods
  getUserAlbum(albumId: string) {
    return this.get().pipe(
      takeUntilDestroyed(this.destroyRef),
      map((user) => {
        if (user) {
          for (const album of user.collection.albums) {
            if (album.ref.id === albumId) {
              return album;
            }
          }
        }
        return undefined;
      }),
    );
  }

  async addAlbumToCollection(albumData: UserAlbum) {
    const userData = await this.getUserData();
    if (!userData) return;

    const data = userData.document;
    const albumsCollection = data.collection.albums;
    let isInArray = false;
    for (let i = 0; i < albumsCollection.length; i++) {
      if (albumData.ref.id == albumsCollection[i].ref.id) {
        albumsCollection[i].in_collection = true;
        isInArray = true;
        break;
      }
    }
    if (!isInArray) albumsCollection.push(albumData);
    data.collection.albums = albumsCollection;
    return this.usersRef.doc(userData.uid).update(data);
  }

  async updateAlbumFromCollection(albumData: UserAlbum) {
    const userData = await this.getUserData();
    if (!userData) return;

    const data = userData.document;
    const albumsCollection = data.collection.albums;
    for (let i = 0; i < albumsCollection.length; i++) {
      if (albumData.ref.id == albumsCollection[i].ref.id) {
        albumsCollection[i] = albumData;
        break;
      }
    }
    data.collection.albums = albumsCollection;
    return this.usersRef.doc(userData.uid).update(data);
  }

  async removeAlbumFromCollection(albumId: string) {
    const userData = await this.getUserData();
    if (!userData) return;

    const data = userData.document;
    const albumsCollection = [];
    for (let i = 0; i < data.collection.albums.length; i++) {
      if (albumId != data.collection.albums[i].ref.id) {
        albumsCollection.push(data.collection.albums[i]);
      } else {
        const updatedAlbum: UserAlbum = {
          ...data.collection.albums[i],
          in_collection: false,
        };
        albumsCollection.push(updatedAlbum);
      }
    }
    data.collection.albums = albumsCollection;
    return this.usersRef.doc(userData.uid).update(data);
  }
}
