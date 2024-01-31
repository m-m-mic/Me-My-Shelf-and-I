import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { AccountButtonComponent } from '../../components/header-button/account-button.component';
import { Store } from '@ngrx/store';
import { signOut } from '../../states/auth/auth.actions';
import { MainNavigationComponent } from '../../components/main-navigation/main-navigation.component';
import { map } from 'rxjs';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    AccountButtonComponent,
    MainNavigationComponent,
    SidebarComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  authenticationService = inject(AuthenticationService);
  store = inject(Store);

  displayName$ = this.authenticationService.authUser$.pipe(
    map((user) => {
      return user?.displayName ?? user?.email ?? undefined;
    }),
  );
  loggedIn$ = this.authenticationService.loggedIn();

  signOut() {
    this.store.dispatch(signOut());
  }
}
