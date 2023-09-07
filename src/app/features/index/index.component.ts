import { Component, OnInit } from '@angular/core';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { Store } from '@ngrx/store';
import { selectToken } from '../../core/states/auth.selectors';
import { NgIf } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  standalone: true,
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  imports: [LandingPageComponent, NgIf, DashboardComponent],
})
export class IndexComponent implements OnInit {
  isLoggedIn!: boolean;
  constructor(private store: Store) {}
  ngOnInit() {
    this.isLoggedIn = !!this.store.select(selectToken);
  }
}
