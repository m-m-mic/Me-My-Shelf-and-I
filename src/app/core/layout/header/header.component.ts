import { Component, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { HeaderButtonComponent } from '../../components/header-button/header-button.component';
import { MenuItem } from 'primeng/api';
import { Store } from '@ngrx/store';
import { signOut } from '../../states/auth/auth.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MainNavigationComponent } from '../../components/main-navigation/main-navigation.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HeaderButtonComponent,
    MainNavigationComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isLoggedIn = false;
  displayName = 'Account';
  menuItems!: MenuItem[];

  constructor(
    private authenticationService: AuthenticationService,
    private store: Store,
  ) {
    this.authenticationService
      .getUser()
      .pipe(takeUntilDestroyed())
      .subscribe((user) => {
        if (user) {
          this.isLoggedIn = true;
          this.displayName = user.displayName ?? (user.email as string);
        } else {
          this.isLoggedIn = false;
          this.displayName = 'Account';
        }
        this.menuItems = [
          {
            label: 'Sign In',
            routerLink: '/sign-in',
            visible: !this.isLoggedIn,
          },
          {
            label: 'Sign Up',
            routerLink: '/sign-up',
            visible: !this.isLoggedIn,
          },
          {
            label: 'Sign Out',
            command: () => {
              this.store.dispatch(signOut());
            },
            visible: this.isLoggedIn,
          },
        ];
      });
  }
}
