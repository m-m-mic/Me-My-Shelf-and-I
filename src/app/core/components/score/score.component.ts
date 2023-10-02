import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Score } from '../../models/rating.interface';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent {
  @Input() score: Score = {
    average: 0,
    ratings: 0,
  };

  get containerColorClass() {
    if (this.score.average >= 1 && this.score.average < 5) {
      return 'poor';
    } else if (this.score.average >= 5 && this.score.average < 7) {
      return 'average';
    } else if (this.score.average >= 7) {
      return 'good';
    } else {
      return '';
    }
  }
}
