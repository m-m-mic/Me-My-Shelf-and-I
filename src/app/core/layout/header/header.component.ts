import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { HeaderButtonComponent } from '../../components/header-button/header-button.component';
import { MenuItem } from 'primeng/api';
import { Store } from '@ngrx/store';
import { signOut } from '../../states/auth/auth.actions';
import { Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TabSelectionComponent } from '../../components/tab-selection/tab-selection.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HeaderButtonComponent,
    TabSelectionComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  authenticationService = inject(AuthenticationService);
  store = inject(Store);
  destroyRef = inject(DestroyRef);
  isLoggedIn = false;
  displayName = 'Account';
  menuItems!: MenuItem[];
  authSubscription!: Subscription;

  ngOnInit() {
    this.authSubscription = this.authenticationService
      .getUser()
      .pipe(takeUntilDestroyed(this.destroyRef))
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
