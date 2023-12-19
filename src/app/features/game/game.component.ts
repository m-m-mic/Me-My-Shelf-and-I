import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game, UserGame } from '../../core/models/game.interface';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ChipModule } from 'primeng/chip';
import { createGameObject, fillGameForm } from './game.form';
import { UsersService } from '../../core/services/users.service';
import { userItemsTemplate } from '../../shared/templates/user-items.template';
import { Score } from '../../core/models/rating.interface';
import { SliderModule } from 'primeng/slider';
import { convertScoreToColor } from '../../shared/converters/score-color.converter';
import { MediaDataComponent } from '../../core/components/media-data/media-data.component';
import { Title } from '@angular/platform-browser';
import { convertTitle } from '../../shared/converters/title.converter';
import { InputNumberModule } from 'primeng/inputnumber';
import { PageTitleService } from '../../core/services/page-title.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    DividerModule,
    ButtonModule,
    ReactiveFormsModule,
    SelectButtonModule,
    InputTextareaModule,
    ChipModule,
    SliderModule,
    MediaDataComponent,
    InputNumberModule,
  ],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnChanges {
  formBuilder = inject(FormBuilder);
  usersService = inject(UsersService);
  pageTitle = inject(PageTitleService);

  @Input() gameData?: Game;
  @Input() userGameData?: UserGame;
  @Input() id?: string;
  @Input() score?: Score;

  gameForm: FormGroup = this.formBuilder.group(fillGameForm());
  selectItems = userItemsTemplate;
  initialScore = 0;

  ngOnChanges(changes: SimpleChanges) {
    this.initialScore = this.userGameData?.score ?? 0;
    if (this.gameData) {
      this.pageTitle.pageTitle.next(this.gameData.title);
    }
    this.gameForm = this.formBuilder.group(fillGameForm(this.userGameData));
  }

  get currentScore() {
    const score = this.gameForm.controls['score'].value;
    if (score === 0) return 'Unrated';
    return score.toString();
  }

  get containerColorClass() {
    return convertScoreToColor(this.gameForm.controls['score'].value);
  }

  updateData() {
    if (this.userGameData && this.gameForm) {
      this.usersService.updateGameFromCollection(
        createGameObject(this.userGameData.ref, this.gameForm),
        this.initialScore,
      );
    }
  }
}
