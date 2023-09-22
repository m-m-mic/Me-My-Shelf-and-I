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
import { movieItems } from './movie.items';
import { LoadingComponent } from '../../core/layout/loading/loading.component';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MoviesService } from '../../core/services/movies.service';
import { createMovieObject, fillMovieForm } from './movie.form';
import { fillGameForm } from '../game/game.form';

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

  movieForm: FormGroup = this.formBuilder.group(fillMovieForm());
  selectItems = movieItems;

  ngOnChanges(changes: SimpleChanges) {
    this.movieForm = this.formBuilder.group(fillMovieForm(this.userMovieData));
  }

  addToCollection() {
    if (this.id) this.moviesService.saveToUserCollection(this.id);
  }

  updateData() {
    if (this.userMovieData && this.movieForm) {
      this.usersService.updateMovieFromCollection(
        createMovieObject(this.userMovieData.ref, this.movieForm),
      );
    }
  }

  removeFromCollection() {
    if (this.id) this.moviesService.removeFromUserCollection(this.id);
  }
}
