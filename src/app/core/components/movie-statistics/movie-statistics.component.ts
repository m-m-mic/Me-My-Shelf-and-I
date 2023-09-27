import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../layout/loading/loading.component';
import { RouterLink } from '@angular/router';
import { Statistics } from '../../models/statistics.interface';

@Component({
  selector: 'app-movie-statistics',
  standalone: true,
  imports: [CommonModule, LoadingComponent, RouterLink],
  templateUrl: './movie-statistics.component.html',
  styleUrls: ['./movie-statistics.component.scss'],
})
export class MovieStatisticsComponent {
  @Input() statistics?: Statistics;
}
