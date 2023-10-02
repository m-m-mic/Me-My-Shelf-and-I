import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Game, UserGame } from '../../core/models/game.interface';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ChipModule } from 'primeng/chip';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionAdd, ionBookmark, ionRemove } from '@ng-icons/ionicons';
import { createGameObject, fillGameForm } from './game.form';
import { GamesService } from '../../core/services/games.service';
import { UsersService } from '../../core/services/users.service';
import { LoadingComponent } from '../../core/layout/loading/loading.component';
import { userItemsTemplate } from '../../shared/templates/user-items.template';
import { Score } from '../../core/models/rating.interface';
import { ScoreComponent } from '../../core/components/score/score.component';

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
    NgOptimizedImage,
    NgIconComponent,
    LoadingComponent,
    ScoreComponent,
  ],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  viewProviders: [provideIcons({ ionAdd, ionRemove, ionBookmark })],
})
export class GameComponent implements OnChanges {
  formBuilder = inject(FormBuilder);
  gamesService = inject(GamesService);
  usersService = inject(UsersService);

  @Input() gameData?: Game;
  @Input() userGameData?: UserGame;
  @Input() id?: string;
  @Input() score?: Score;

  gameForm: FormGroup = this.formBuilder.group(fillGameForm());
  selectItems = userItemsTemplate;

  ngOnChanges(changes: SimpleChanges) {
    this.gameForm = this.formBuilder.group(fillGameForm(this.userGameData));
  }

  addToCollection() {
    if (this.id) this.gamesService.saveToUserCollection(this.id);
  }

  updateData() {
    if (this.userGameData && this.gameForm) {
      this.usersService.updateGameFromCollection(
        createGameObject(this.userGameData.ref, this.gameForm),
      );
    }
  }

  removeFromCollection() {
    if (this.id) this.gamesService.removeFromUserCollection(this.id);
  }
}
