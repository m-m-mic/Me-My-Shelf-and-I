import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { signOut } from '../../states/auth.actions';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn!: boolean;
  constructor(
    private store: Store,
    private authenticationService: AuthenticationService,
  ) {}

  ngOnInit() {
    this.authenticationService.loggedIn$.subscribe(
      (value) => (this.isLoggedIn = value),
    );
  }

  signOut() {
    this.store.dispatch(signOut());
  }
}
