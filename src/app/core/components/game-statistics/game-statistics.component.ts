import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../layout/loading/loading.component';
import { RouterLink } from '@angular/router';
import { Statistics } from '../../models/statistics.interface';

@Component({
  selector: 'app-game-statistics',
  standalone: true,
  imports: [CommonModule, LoadingComponent, RouterLink],
  templateUrl: './game-statistics.component.html',
  styleUrls: ['./game-statistics.component.scss'],
})
export class GameStatisticsComponent {
  @Input() statistics?: Statistics;
}
