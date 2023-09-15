import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { UsersService } from '../../core/services/users.service';
import { GameCardComponent } from '../../core/components/game-card/game-card.component';
import { UserCollection } from '../../core/models/user.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ButtonModule, GameCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  collection: UserCollection = {
    games: [],
    movies: [],
    albums: [],
  };

  constructor(private usersService: UsersService) {
    this.usersService.getCollection().then((collection) => {
      if (collection) this.collection = collection;
    });
  }
}
