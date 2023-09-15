import { Component, inject, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { GameType, UserGameType } from '../../core/models/game.interface';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ChipModule } from 'primeng/chip';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionAdd, ionBookmark, ionRemove } from '@ng-icons/ionicons';
import { gameItems } from './game.items';
import { createGameObject } from './game.form';
import { GamesService } from '../../core/services/games.service';
import { UsersService } from '../../core/services/users.service';

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
  ],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  viewProviders: [provideIcons({ ionAdd, ionRemove, ionBookmark })],
})
export class GameComponent {
  @Input() gameData?: GameType;
  @Input() gameForm?: FormGroup;
  @Input() userGameData?: UserGameType;
  @Input() id?: string;

  gamesService = inject(GamesService);
  usersService = inject(UsersService);

  selectItems = gameItems;

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
