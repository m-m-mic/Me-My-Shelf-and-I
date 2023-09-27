import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { HeaderButtonComponent } from '../../components/header-button/header-button.component';
import { MenuItem } from 'primeng/api';
import { Store } from '@ngrx/store';
import { signOut } from '../../states/auth/auth.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MainNavigationComponent } from '../../components/main-navigation/main-navigation.component';
import { map, Observable, tap } from 'rxjs';

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
  displayName$?: Observable<string | undefined>;
  menuItems!: MenuItem[];

  constructor(
    private authenticationService: AuthenticationService,
    private store: Store,
  ) {
    this.displayName$ = this.authenticationService.getUser().pipe(
      takeUntilDestroyed(),
      tap((user) => {
        this.isLoggedIn = !!user;
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
            label: 'Settings',
            routerLink: '/settings',
            visible: this.isLoggedIn,
          },
          {
            label: 'Sign Out',
            command: () => {
              this.store.dispatch(signOut());
            },
            visible: this.isLoggedIn,
          },
        ];
      }),
      map((user) => user?.displayName ?? undefined),
    );
  }
}
