import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { AccountButtonComponent } from '../../components/header-button/account-button.component';
import { MenuItem } from 'primeng/api';
import { Store } from '@ngrx/store';
import { signOut } from '../../states/auth/auth.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MainNavigationComponent } from '../../components/main-navigation/main-navigation.component';
import { map, Observable } from 'rxjs';
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
  displayName$: Observable<string | undefined>;
  menuItems$: Observable<MenuItem[]>;

  constructor(
    private authenticationService: AuthenticationService,
    private store: Store,
  ) {
    this.displayName$ = this.authenticationService.authUser$.pipe(
      takeUntilDestroyed(),
      map((user) => {
        if (user) {
          return user.displayName ?? user.email ?? 'Account';
        }
        return undefined;
      }),
    );
    this.menuItems$ = this.authenticationService.authUser$.pipe(
      takeUntilDestroyed(),
      map((user) => {
        if (user) {
          return [
            {
              label: 'Settings',
              routerLink: '/settings',
            },
            {
              label: 'Sign Out',
              command: () => {
                this.store.dispatch(signOut());
              },
            },
          ];
        }
        return [
          {
            label: 'Sign In',
            routerLink: '/sign-in',
          },
          {
            label: 'Sign Up',
            routerLink: '/sign-up',
          },
        ];
      }),
    );
  }
}
