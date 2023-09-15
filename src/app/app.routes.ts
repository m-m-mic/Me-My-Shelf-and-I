import { Routes } from '@angular/router';
import { SignUpComponent } from './features/sign-up/sign-up.component';
import { SignInComponent } from './features/sign-in/sign-in.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AuthenticationGuard } from './core/services/authentication.guard';
import { GamesComponent } from './features/games/games.component';
import { GameComponent } from './features/game/game.component';
import { MoviesComponent } from './features/movies/movies.component';
import { MovieComponent } from './features/movie/movie.component';
import { AlbumsComponent } from './features/albums/albums.component';
import { AlbumComponent } from './features/album/album.component';
import { GameContainerComponent } from './features/game/game.container';

export const ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthenticationGuard],
    data: { blockAuthenticated: false, redirectToSignIn: false },
  },
  {
    path: 'games',
    component: GamesComponent,
    canActivate: [AuthenticationGuard],
    data: { blockAuthenticated: false, redirectToSignIn: true },
  },
  {
    path: 'games/:gameId',
    component: GameContainerComponent,
    canActivate: [AuthenticationGuard],
    data: { blockAuthenticated: false, redirectToSignIn: true },
  },
  {
    path: 'movies',
    component: MoviesComponent,
    canActivate: [AuthenticationGuard],
    data: { blockAuthenticated: false, redirectToSignIn: true },
  },
  {
    path: 'movies/:movieId',
    component: MovieComponent,
    canActivate: [AuthenticationGuard],
    data: { blockAuthenticated: false, redirectToSignIn: true },
  },
  {
    path: 'albums',
    component: AlbumsComponent,
    canActivate: [AuthenticationGuard],
    data: { blockAuthenticated: false, redirectToSignIn: true },
  },
  {
    path: 'albums/:albumId',
    component: AlbumComponent,
    canActivate: [AuthenticationGuard],
    data: { blockAuthenticated: false, redirectToSignIn: true },
  },
  {
    path: 'welcome',
    component: LandingPageComponent,
    canActivate: [AuthenticationGuard],
    data: { blockAuthenticated: true, redirectToSignIn: false },
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [AuthenticationGuard],
    data: { blockAuthenticated: true, redirectToSignIn: false },
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [AuthenticationGuard],
    data: { blockAuthenticated: true, redirectToSignIn: false },
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' },
];
