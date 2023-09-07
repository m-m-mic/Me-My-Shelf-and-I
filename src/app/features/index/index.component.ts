import { Component, OnInit } from '@angular/core';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { Store } from '@ngrx/store';
import { NgIf } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthenticationService } from '../../core/services/authentication.service';

@Component({
  standalone: true,
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  imports: [LandingPageComponent, NgIf, DashboardComponent],
})
export class IndexComponent implements OnInit {
  isLoggedIn!: boolean;
  constructor(private authenticationService: AuthenticationService) {}
  ngOnInit() {
    this.authenticationService.loggedIn$.subscribe(
      (value) => (this.isLoggedIn = value),
    );
  }
}
