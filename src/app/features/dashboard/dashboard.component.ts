import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { UsersService } from '../../core/services/users.service';
import { GameCardComponent } from '../../core/components/game-card/game-card.component';
import { UserCollection } from '../../core/models/user.interface';
import { LoadingComponent } from '../../core/layout/loading/loading.component';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MovieCardComponent } from '../../core/components/movie-card/movie-card.component';
import { AlbumCardComponent } from '../../core/components/album-card/album-card.component';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { GameStatisticsComponent } from '../../core/components/game-statistics/game-statistics.component';
import { UserStatistics } from '../../core/models/statistics.interface';
import { AlbumStatisticsComponent } from '../../core/components/album-statistics/album-statistics.component';
import { MovieStatisticsComponent } from '../../core/components/movie-statistics/movie-statistics.component';
import { MediaTableComponent } from '../../core/components/media-table/media-table.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

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
    GameStatisticsComponent,
    AlbumStatisticsComponent,
    MovieStatisticsComponent,
    MediaTableComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  collection?: UserCollection;
  statistics?: UserStatistics;

  tabItems: MenuItem[] = [
    { label: 'Games' },
    { label: 'Movies' },
    { label: 'Albums' },
  ];
  activeTab: MenuItem = this.tabItems[0];

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    usersService.getCollection().then((collection) => {
      if (collection) {
        this.collection = collection;
        this.statistics = usersService.getCollectionStatistics(collection);
      }
    });

    route.queryParams.pipe(takeUntilDestroyed()).subscribe((params) => {
      if (!params) return;
      const mediaType = params['tab'];
      switch (mediaType) {
        case 'movies':
          this.activeTab = this.tabItems[1];
          return;
        case 'albums':
          this.activeTab = this.tabItems[2];
          return;
        default:
          this.activeTab = this.tabItems[0];
          return;
      }
    });
  }

  changeActiveItem(event: MenuItem) {
    this.router.navigate(['/dashboard'], {
      queryParams: { tab: event.label?.toLowerCase() },
    });
  }
}
