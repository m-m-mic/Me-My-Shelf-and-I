import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../core/services/authentication.service';
import firebase from 'firebase/compat';
import User = firebase.User;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  userData: User | null = null;
  constructor(private authenticationService: AuthenticationService) {
    authenticationService.getUser().subscribe((user) => {
      this.userData = user;
    });
  }
}
