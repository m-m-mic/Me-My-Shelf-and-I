import { Routes } from '@angular/router';
import { SignUpComponent } from './features/sign-up/sign-up.component';
import { SignInComponent } from './features/sign-in/sign-in.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AuthenticationGuard } from './core/services/authentication.guard';
import { GameContainerComponent } from './features/game/game.container';
import { MovieContainerComponent } from './features/movie/movie.container';
import { AlbumContainerComponent } from './features/album/album.container';
import { GamesContainerComponent } from './features/games/games.container';
import { MoviesContainerComponent } from './features/movies/movies.container';
import { AlbumsContainerComponent } from './features/albums/albums.container';

export const ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthenticationGuard],
    data: { blockAuthenticated: false, redirectToSignIn: false },
  },
  {
    path: 'games',
    component: GamesContainerComponent,
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
    component: MoviesContainerComponent,
    canActivate: [AuthenticationGuard],
    data: { blockAuthenticated: false, redirectToSignIn: true },
  },
  {
    path: 'movies/:movieId',
    component: MovieContainerComponent,
    canActivate: [AuthenticationGuard],
    data: { blockAuthenticated: false, redirectToSignIn: true },
  },
  {
    path: 'albums',
    component: AlbumsContainerComponent,
    canActivate: [AuthenticationGuard],
    data: { blockAuthenticated: false, redirectToSignIn: true },
  },
  {
    path: 'albums/:albumId',
    component: AlbumContainerComponent,
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
