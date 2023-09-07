import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { signOut } from '../../states/auth.actions';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() isLoggedIn!: boolean;

  constructor(
    private store: Store,
    private cookieService: CookieService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.router.events.subscribe(
      () => (this.isLoggedIn = !!this.cookieService.get('token')),
    );
  }

  signOut() {
    this.store.dispatch(signOut());
  }
}
