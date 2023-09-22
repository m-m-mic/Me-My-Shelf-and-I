import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesStatistics } from '../../models/user.interface';
import { LoadingComponent } from '../../layout/loading/loading.component';

@Component({
  selector: 'app-game-statistics',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  templateUrl: './game-statistics.component.html',
  styleUrls: ['./game-statistics.component.scss'],
})
export class GameStatisticsComponent {
  @Input() statistics?: GamesStatistics;
}
