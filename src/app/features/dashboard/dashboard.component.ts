import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../core/services/authentication.service';
import firebase from 'firebase/compat';
import User = firebase.User;
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { selectToken } from '../../core/states/auth/auth.selectors';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  userData: User | null = null;
  storeToken$ = this.store.select(selectToken);

  constructor(
    private authenticationService: AuthenticationService,
    private store: Store,
  ) {
    authenticationService.getUser().subscribe((user) => {
      this.userData = user;
    });
  }
}
