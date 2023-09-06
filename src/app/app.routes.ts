import { Routes } from '@angular/router';
import { IndexComponent } from './features/index/index.component';
import { SignUpComponent } from './features/sign-up/sign-up.component';
import { SignInComponent } from './features/sign-in/sign-in.component';
import { NotFoundComponent } from './features/not-found/not-found.component';

export const ROUTES: Routes = [
  { path: '', component: IndexComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' },
];
