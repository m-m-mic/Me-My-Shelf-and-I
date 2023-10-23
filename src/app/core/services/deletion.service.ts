import { inject, Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { UsersService } from './users.service';
import { GamesService } from './games.service';
import { MoviesService } from './movies.service';
import { AlbumsService } from './albums.service';
import { Router } from '@angular/router';
import { RatingsService } from './ratings.service';

@Injectable({
  providedIn: 'root',
})
export class DeletionService {
  authenticationService = inject(AuthenticationService);
  usersService = inject(UsersService);
  gamesService = inject(GamesService);
  moviesService = inject(MoviesService);
  albumsService = inject(AlbumsService);
  ratingsService = inject(RatingsService);
  router = inject(Router);

  async delete() {
    const authUser = await this.authenticationService.auth.currentUser;

    if (!authUser) {
      throw new Error('Could not find user');
    }

    await this.deleteAllCollectionItems();
    await this.usersService.delete(authUser.uid);
    await authUser.delete();
    this.router.navigate(['/']);
  }

  async deleteAllCollectionItems() {
    const userData = await this.usersService.getUserData();

    for (const game of userData.document.collection.games) {
      if (game.in_collection) {
        await this.gamesService.removeUser(game.ref.id);
      }
      if (game.score && game.score > 0) {
        await this.ratingsService.removeRating(game.ref.id);
      }
    }

    for (const movie of userData.document.collection.movies) {
      if (movie.in_collection) {
        await this.moviesService.removeUser(movie.ref.id);
      }
      if (movie.score && movie.score > 0) {
        await this.ratingsService.removeRating(movie.ref.id);
      }
    }

    for (const album of userData.document.collection.albums) {
      if (album.in_collection) {
        await this.albumsService.removeUser(album.ref.id);
      }
      if (album.score && album.score > 0) {
        await this.ratingsService.removeRating(album.ref.id);
      }
    }
  }
}
