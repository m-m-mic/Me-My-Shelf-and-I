import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../layout/loading/loading.component';
import { RouterLink } from '@angular/router';
import { Statistics } from '../../models/statistics.interface';

@Component({
  selector: 'app-album-statistics',
  standalone: true,
  imports: [CommonModule, LoadingComponent, RouterLink],
  templateUrl: './album-statistics.component.html',
  styleUrls: ['./album-statistics.component.scss'],
})
export class AlbumStatisticsComponent {
  @Input() statistics?: Statistics;

  get runtimeInHours() {
    if (!this.statistics) {
      return 0;
    }
    return Math.round(this.statistics.time / 60);
  }

  get hoursPerEntry() {
    if (!this.statistics || this.runtimeInHours === 0) {
      return 0;
    }
    return Math.round(this.runtimeInHours / this.statistics.amountInCollection);
  }
}
