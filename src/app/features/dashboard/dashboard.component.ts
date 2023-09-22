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
  uid = '';
  loading = true;
  tabItems: MenuItem[] = [
    { label: 'Games' },
    { label: 'Movies' },
    { label: 'Albums' },
  ];
  activeItem: MenuItem = this.tabItems[0];
  currentTab = this.activeItem.label;

  gameColumns: ColDef[] = [
    {
      field: 'title',
      sortable: true,
      initialSort: 'asc',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      minWidth: 400,
      cellRenderer: (params: { data: { id: string }; value: string }) => {
        return (
          '<a href="/games/' + params.data.id + '">' + params.value + '</a>'
        );
      },
    },
    {
      field: 'platform',
      sortable: true,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      width: 180,
    },
    {
      field: 'format',
      sortable: true,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      width: 180,
    },
    {
      field: 'progress',
      sortable: true,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      width: 180,
    },
    {
      field: 'added_on',
      headerName: 'Added on',
      sortable: true,
      cellRenderer: (params: { value: number }) => {
        return new Date(params.value).toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      },
    },
  ];

  gridOptions: GridOptions = { domLayout: 'autoHeight' };

  constructor(private usersService: UsersService) {
    usersService.getCollection().then((collection) => {
      if (collection) {
        this.collection = collection;
        this.statistics = usersService.getStatistics(collection);
        this.loading = false;
      }
    });
  }

  changeActiveItem(event: MenuItem) {
    this.activeItem = event;
    this.currentTab = event.label;
  }

  getRowId: GetRowIdFunc = (params: GetRowIdParams) => params.data.id;
}
