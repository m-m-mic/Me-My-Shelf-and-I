import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { UsersService } from '../../core/services/users.service';
import { GameCardComponent } from '../../core/components/game-card/game-card.component';
import {
  UserCollection,
  UserStatistics,
} from '../../core/models/user.interface';
import { LoadingComponent } from '../../core/layout/loading/loading.component';
import { RouterLink } from '@angular/router';
import { MovieCardComponent } from '../../core/components/movie-card/movie-card.component';
import { AlbumCardComponent } from '../../core/components/album-card/album-card.component';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    GameCardComponent,
    LoadingComponent,
    RouterLink,
    MovieCardComponent,
    AlbumCardComponent,
    TabMenuModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  collection: UserCollection = {
    games: [],
    movies: [],
    albums: [],
  };
  statistics?: UserStatistics;
  uid = '';
  loading = true;
  tabItems: MenuItem[] = [
    { label: 'Games' },
    { label: 'Movies' },
    { label: 'Albums' },
  ];
  activeItem: MenuItem = this.tabItems[0];
  currentTab = this.activeItem.label;

  constructor(private usersService: UsersService) {
    usersService.getCollection().then((collection) => {
      if (collection) {
        this.collection = collection;
        this.statistics = usersService.getStatistics(this.collection);
        this.loading = false;
      }
    });
  }

  changeActiveItem(event: MenuItem) {
    this.activeItem = event;
    this.currentTab = event.label;
  }
}
