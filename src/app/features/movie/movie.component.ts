import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../core/services/users.service';
import { Movie, UserMovie } from '../../core/models/movie.interface';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { createMovieObject, fillMovieForm } from './movie.form';
import { userItemsTemplate } from '../../shared/templates/user-items.template';
import { Score } from '../../core/models/rating.interface';
import { convertScoreToColor } from '../../shared/converters/score-color.converter';
import { SliderModule } from 'primeng/slider';
import { MediaDataComponent } from '../../core/components/media-data/media-data.component';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    SelectButtonModule,
    InputTextareaModule,
    SliderModule,
    MediaDataComponent,
  ],
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnChanges {
  formBuilder = inject(FormBuilder);
  usersService = inject(UsersService);

  @Input() movieData?: Movie;
  @Input() userMovieData?: UserMovie;
  @Input() id?: string;
  @Input() score?: Score;

  movieForm: FormGroup = this.formBuilder.group(fillMovieForm());
  selectItems = userItemsTemplate;
  initialScore = 0;

  ngOnChanges(changes: SimpleChanges) {
    this.initialScore = this.userMovieData?.score ?? 0;
    this.movieForm = this.formBuilder.group(fillMovieForm(this.userMovieData));
  }

  get currentScore() {
    const score = this.movieForm.controls['score'].value;
    if (score === 0) return 'Unrated';
    return score.toString();
  }

  get containerColorClass() {
    return convertScoreToColor(this.movieForm.controls['score'].value);
  }

  updateData() {
    if (this.userMovieData && this.movieForm) {
      this.usersService.updateMovieFromCollection(
        createMovieObject(this.userMovieData.ref, this.movieForm),
        this.initialScore,
      );
    }
  }
}
