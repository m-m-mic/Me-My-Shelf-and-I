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

  get playtimeInHours() {
    if (!this.statistics) {
      return 0;
    }
    return Math.round(this.statistics.time / 60);
  }

  get hoursPerEntry() {
    if (!this.statistics || this.playtimeInHours === 0) {
      return 0;
    }
    return Math.round(
      this.playtimeInHours / this.statistics.amountInCollection,
    );
  }
}
