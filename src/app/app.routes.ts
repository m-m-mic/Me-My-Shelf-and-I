import { Routes } from '@angular/router';
import { SignUpComponent } from './features/sign-up/sign-up.component';
import { SignInComponent } from './features/sign-in/sign-in.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AuthenticationGuard } from './core/services/authentication.guard';
import { GamesComponent } from './features/games/games.component';
import { GameComponent } from './features/game/game.component';

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
    data: { blockAuthenticated: false, redirectToSignIn: false },
  },
  {
    path: 'games/:gameId',
    component: GameComponent,
    canActivate: [AuthenticationGuard],
    data: { blockAuthenticated: false, redirectToSignIn: false },
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
