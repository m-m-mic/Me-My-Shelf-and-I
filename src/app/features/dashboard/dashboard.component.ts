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
import {
  ColDef,
  GetRowIdFunc,
  GetRowIdParams,
  GridOptions,
} from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';
import { GameStatisticsComponent } from '../../core/components/game-statistics/game-statistics.component';
import { gameColumns, gridOptions } from './dashboard.ag-grid';

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
    AgGridModule,
    GameStatisticsComponent,
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
  tabItems: MenuItem[] = [
    { label: 'Games' },
    { label: 'Movies' },
    { label: 'Albums' },
  ];
  activeItem: MenuItem = this.tabItems[0];
  currentTab = this.activeItem.label;

  gridOptions = gridOptions;
  gameColumns = gameColumns;
  getRowId: GetRowIdFunc = (params: GetRowIdParams) => params.data.id;

  constructor(private usersService: UsersService) {
    usersService.getCollection().then((collection) => {
      if (collection) {
        this.collection = collection;
        this.statistics = usersService.getStatistics(collection);
      }
    });
  }

  changeActiveItem(event: MenuItem) {
    this.activeItem = event;
    this.currentTab = event.label;
  }
}
