import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { MmsaiAccountButtonComponent } from '../../components/mmsai-account-button/mmsai-account-button.component';
import { MenuItem } from 'primeng/api';
import { Store } from '@ngrx/store';
import { signOut } from '../../states/auth/auth.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, MmsaiAccountButtonComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn!: boolean;
  displayName?: string | null;
  menuItems!: MenuItem[];

  constructor(
    private authenticationService: AuthenticationService,
    private store: Store,
  ) {}

  ngOnInit() {
    this.authenticationService.getUser().subscribe((user) => {
      if (user) {
        this.isLoggedIn = true;
        this.displayName = user.displayName ? user.displayName : user.email;
        this.menuItems = [
          {
            label: 'Sign Out',
            command: () => {
              this.store.dispatch(signOut());
            },
          },
        ];
      } else {
        this.isLoggedIn = false;
        this.menuItems = [
          { label: 'Sign In', routerLink: '/sign-in' },
          { label: 'Sign Up', routerLink: '/sign-up' },
        ];
      }
    });
  }
}
