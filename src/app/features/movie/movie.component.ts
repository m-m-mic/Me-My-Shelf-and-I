import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionAdd, ionBookmark, ionRemove } from '@ng-icons/ionicons';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../core/services/users.service';
import { Movie, UserMovie } from '../../core/models/movie.interface';
import { LoadingComponent } from '../../core/layout/loading/loading.component';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MoviesService } from '../../core/services/movies.service';
import { createMovieObject, fillMovieForm } from './movie.form';
import { userItemsTemplate } from '../../shared/templates/user-items.template';
import { Score } from '../../core/models/rating.interface';
import { convertScoreToColor } from '../../shared/converters/score-color.converter';
import { ScoreComponent } from '../../core/components/score/score.component';
import { SliderModule } from 'primeng/slider';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    LoadingComponent,
    ReactiveFormsModule,
    ButtonModule,
    SelectButtonModule,
    InputTextareaModule,
    ScoreComponent,
    SliderModule,
  ],
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
  viewProviders: [provideIcons({ ionAdd, ionRemove, ionBookmark })],
})
export class MovieComponent implements OnChanges {
  formBuilder = inject(FormBuilder);
  moviesService = inject(MoviesService);
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

  addToCollection() {
    if (this.id) this.moviesService.saveToUserCollection(this.id);
  }

  updateData() {
    if (this.userMovieData && this.movieForm) {
      this.usersService.updateMovieFromCollection(
        createMovieObject(this.userMovieData.ref, this.movieForm),
        this.initialScore,
      );
    }
  }

  removeFromCollection() {
    if (this.id) this.moviesService.removeFromUserCollection(this.id);
  }
}
