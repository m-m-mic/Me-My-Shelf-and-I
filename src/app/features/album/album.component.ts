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
import { createAlbumObject, fillAlbumForm } from './album.form';
import { Album, UserAlbum } from '../../core/models/album.interface';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { userItemsTemplate } from '../../shared/templates/user-items.template';
import { Score } from '../../core/models/rating.interface';
import { convertScoreToColor } from '../../shared/converters/score-color.converter';
import { MediaDataComponent } from '../../core/components/media-data/media-data.component';
import { SliderModule } from 'primeng/slider';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InputTextareaModule,
    ReactiveFormsModule,
    SelectButtonModule,
    MediaDataComponent,
    SliderModule,
  ],
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnChanges {
  formBuilder = inject(FormBuilder);
  usersService = inject(UsersService);

  @Input() albumData?: Album;
  @Input() userAlbumData?: UserAlbum;
  @Input() id?: string;
  @Input() score?: Score;

  albumForm: FormGroup = this.formBuilder.group(fillAlbumForm());
  selectItems = userItemsTemplate;
  initialScore = 0;

  ngOnChanges(changes: SimpleChanges) {
    this.initialScore = this.userAlbumData?.score ?? 0;
    this.albumForm = this.formBuilder.group(fillAlbumForm(this.userAlbumData));
  }

  get currentScore() {
    const score = this.albumForm.controls['score'].value;
    if (score === 0) return 'Unrated';
    return score.toString();
  }

  get containerColorClass() {
    return convertScoreToColor(this.albumForm.controls['score'].value);
  }

  updateData() {
    if (this.userAlbumData && this.albumForm) {
      this.usersService.updateAlbumFromCollection(
        createAlbumObject(this.userAlbumData.ref, this.albumForm),
        this.initialScore,
      );
    }
  }
}
