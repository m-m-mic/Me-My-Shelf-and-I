import { DestroyRef, Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { User, UserCollection } from '../models/user.interface';
import { firstValueFrom, map, of, switchMap, take } from 'rxjs';
import { UserGame } from '../models/game.interface';
import { AuthenticationService } from './authentication.service';
import { UserMovie } from '../models/movie.interface';
import { UserAlbum } from '../models/album.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { statisticsTemplate } from '../../shared/templates/statistics.template';
import {
  convertFormat,
  convertProgress,
} from '../../shared/converters/attribute.converter';
import { RatingsService } from './ratings.service';
import { MediaRow } from '../models/table.interface';
import { Router } from '@angular/router';

const USERS_PATH = '/users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  usersRef: AngularFirestoreCollection<User>;

  constructor(
    private db: AngularFirestore,
    private authenticationService: AuthenticationService,
    private destroyRef: DestroyRef,
    private ratingsService: RatingsService,
    private router: Router,
  ) {
    this.usersRef = db.collection(USERS_PATH);
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

  delete(id: string) {
    return this.usersRef.doc(id).delete();
  }

  async getCollection() {
    const userData = await this.getUserData();
    if (!userData) return;

    const collection: UserCollection = {
      games: [],
      movies: [],
      albums: [],
    };

    await Promise.all(
      userData.document.collection.games.map(async (game) => {
        const gameRef = await game.ref.get();
        const gameData = gameRef.data();
        if (gameData && game.in_collection) {
          collection.games.push({
            id: gameRef.id,
            title: gameData.title,
            platform: gameData.platform ?? '',
            format: convertFormat(game.format),
            progress: convertProgress(game.progress),
            time: game.playtime ?? 0,
            added_on: game.added_on,
          });
        }
      }),
    );

    await Promise.all(
      userData.document.collection.movies.map(async (movie) => {
        const movieRef = await movie.ref.get();
        const movieData = movieRef.data();
        if (movieData && movie.in_collection) {
          collection.movies.push({
            id: movieRef.id,
            title: movieData.title,
            director: movieData.director ?? '',
            format: convertFormat(movie.format),
            progress: convertProgress(movie.progress),
            time:
              movieData.runtime && movie.progress === 'completed'
                ? movieData.runtime
                : 0,
            added_on: movie.added_on,
          });
        }
      }),
    );

    await Promise.all(
      userData.document.collection.albums.map(async (album) => {
        const albumRef = await album.ref.get();
        const albumData = albumRef.data();
        if (albumData && album.in_collection) {
          collection.albums.push({
            id: albumRef.id,
            title: albumData.title,
            artist: albumData.artist ?? '',
            format: convertFormat(album.format),
            progress: convertProgress(album.progress),
            time:
              albumData.runtime && album.progress === 'completed'
                ? albumData.runtime
                : 0,
            added_on: album.added_on,
          });
        }
      }),
    );

    return collection;
  }

  getCollectionStatistics(collection: UserCollection) {
    return {
      games: this.getStatistics(collection.games),
      movies: this.getStatistics(collection.movies),
      albums: this.getStatistics(collection.albums),
    };
  }

  getStatistics(collection: MediaRow[]) {
    const statistics = statisticsTemplate();
    collection.forEach((item) => {
      statistics.amountInCollection++;
      statistics.time = statistics.time + item.time;
      switch (item.format) {
        case 'Physical':
          statistics.formatDistribution.physical++;
          break;
        case 'Digital':
          statistics.formatDistribution.digital++;
          break;
      }
      switch (item.progress) {
        case 'Not Started':
          statistics.progressDistribution.notStarted++;
          break;
        case 'In Progress':
          statistics.progressDistribution.inProgress++;
          break;
        case 'Completed':
          statistics.progressDistribution.completed++;
      }
    });
    return statistics;
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
        gamesCollection[i].added_on = new Date().getTime();
        isInArray = true;
        break;
      }
    }
    if (!isInArray) gamesCollection.push(gameData);
    data.collection.games = gamesCollection;
    return this.usersRef.doc(userData.uid).update(data);
  }

  async updateGameFromCollection(gameData: UserGame, initialScore: number) {
    const userData = await this.getUserData();
    if (!userData) return;

    if (gameData.score != undefined && initialScore != gameData.score) {
      if (initialScore === 0) {
        this.ratingsService.addRating(gameData.ref.id, gameData.score);
      } else if (gameData.score === 0) {
        this.ratingsService.removeRating(gameData.ref.id);
      } else {
        this.ratingsService.updateRating(gameData.ref.id, gameData.score);
      }
    }

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
        moviesCollection[i].added_on = new Date().getTime();
        isInArray = true;
        break;
      }
    }
    if (!isInArray) moviesCollection.push(movieData);
    data.collection.movies = moviesCollection;
    return this.usersRef.doc(userData.uid).update(data);
  }

  async updateMovieFromCollection(movieData: UserMovie, initialScore: number) {
    const userData = await this.getUserData();
    if (!userData) return;

    if (movieData.score != undefined && initialScore != movieData.score) {
      if (initialScore === 0) {
        this.ratingsService.addRating(movieData.ref.id, movieData.score);
      } else if (movieData.score === 0) {
        this.ratingsService.removeRating(movieData.ref.id);
      } else {
        this.ratingsService.updateRating(movieData.ref.id, movieData.score);
      }
    }

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
        albumsCollection[i].added_on = new Date().getTime();
        isInArray = true;
        break;
      }
    }
    if (!isInArray) albumsCollection.push(albumData);
    data.collection.albums = albumsCollection;
    return this.usersRef.doc(userData.uid).update(data);
  }

  async updateAlbumFromCollection(albumData: UserAlbum, initialScore: number) {
    const userData = await this.getUserData();
    if (!userData) return;

    if (albumData.score != undefined && initialScore != albumData.score) {
      if (initialScore === 0) {
        this.ratingsService.addRating(albumData.ref.id, albumData.score);
      } else if (albumData.score === 0) {
        this.ratingsService.removeRating(albumData.ref.id);
      } else {
        this.ratingsService.updateRating(albumData.ref.id, albumData.score);
      }
    }

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
