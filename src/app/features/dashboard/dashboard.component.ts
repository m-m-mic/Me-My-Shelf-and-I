import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { UsersService } from '../../core/services/users.service';
import { AuthenticationService } from '../../core/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  userCollection!: object;
  constructor(
    private authenticationService: AuthenticationService,
    private usersService: UsersService,
  ) {
    this.authenticationService.getUser().subscribe((user) => {
      if (user) console.log(this.usersService.getOne(user.uid));
    });
  }
}
