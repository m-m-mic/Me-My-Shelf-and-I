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
}
