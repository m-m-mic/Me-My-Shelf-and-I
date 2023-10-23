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
import { AuthManagementComponent } from './features/auth-management/auth-management.component';
import { SettingsComponent } from './features/settings/settings.component';
import { convertTitle } from './shared/converters/title.converter';
import {
  PageTitleService,
  titleResolver,
} from './core/services/page-title.service';

export const ROUTES: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    canActivate: [AuthenticationGuard],
    title: convertTitle('Welcome'),
    data: { blockAuthenticated: true, redirectToSignIn: false },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthenticationGuard],
    title: convertTitle('Dashboard'),
    data: { blockAuthenticated: false, redirectToSignIn: false },
  },
  {
    path: 'games',
    component: GamesContainerComponent,
    canActivate: [AuthenticationGuard],
    title: convertTitle('Games'),
    data: { blockAuthenticated: false, redirectToSignIn: true },
  },
  {
    path: 'games/:gameId',
    component: GameContainerComponent,
    canActivate: [AuthenticationGuard],
    title: titleResolver,
    data: { blockAuthenticated: false, redirectToSignIn: true },
  },
  {
    path: 'movies',
    component: MoviesContainerComponent,
    canActivate: [AuthenticationGuard],
    title: convertTitle('Movies'),
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
    title: convertTitle('Albums'),
    data: { blockAuthenticated: false, redirectToSignIn: true },
  },
  {
    path: 'albums/:albumId',
    component: AlbumContainerComponent,
    canActivate: [AuthenticationGuard],
    data: { blockAuthenticated: false, redirectToSignIn: true },
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthenticationGuard],
    title: convertTitle('Settings'),
    data: { blockAuthenticated: false, redirectToSignIn: true },
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [AuthenticationGuard],
    title: convertTitle('Sign Up'),
    data: { blockAuthenticated: true, redirectToSignIn: false },
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [AuthenticationGuard],
    title: convertTitle('Sign In'),
    data: { blockAuthenticated: true, redirectToSignIn: false },
  },
  {
    path: 'auth',
    component: AuthManagementComponent,
    canActivate: [AuthenticationGuard],
    data: { blockAuthenticated: true, redirectToSignIn: false, email: '' },
  },
  {
    path: '404',
    component: NotFoundComponent,
    title: convertTitle('Not found'),
  },
  { path: '**', redirectTo: '404' },
];
