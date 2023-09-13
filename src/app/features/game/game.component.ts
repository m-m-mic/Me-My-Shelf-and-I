import { Component, DestroyRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesService } from '../../core/services/games.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { take } from 'rxjs';
import { GameType, UserGameType } from '../../core/models/game.interface';
import { UsersService } from '../../core/services/users.service';
import { AuthenticationService } from '../../core/services/authentication.service';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { createGameForm } from './game.form';
import { gameItems } from './game.items';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    DividerModule,
    ButtonModule,
    ReactiveFormsModule,
    SelectButtonModule,
  ],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  private id!: string;
  private uid!: string;
  inUserCollection!: boolean;
  gameData!: GameType;
  userGameData?: UserGameType;
  gameForm!: FormGroup;
  selectItems = gameItems;

  constructor(
    private gamesService: GamesService,
    private usersService: UsersService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private destroyRef: DestroyRef,
    private formBuilder: FormBuilder,
  ) {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const paramId = params.get('gameId');
      if (paramId) this.id = paramId;
    });
  }

  ngOnInit() {
    this.getGameData();
    this.getUserGameData();
  }

  getGameData() {
    this.gamesService
      .getGame(this.id)
      .pipe(take(1))
      .subscribe((game) => {
        if (game) {
          this.gameData = game;
        }
      });
  }

  getUserGameData() {
    this.authenticationService
      .getUser()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((user) => {
        if (user) {
          this.uid = user.uid;
          this.usersService
            .getUser(this.uid)
            .pipe(take(1))
            .subscribe((value) => {
              if (value) {
                this.inUserCollection = false;
                for (const game of value.collection.games) {
                  if (game.ref.id === this.id) {
                    this.inUserCollection = game.in_collection;
                    this.userGameData = game;
                    break;
                  }
                }
                this.gameForm = this.formBuilder.group(
                  createGameForm(this.inUserCollection, this.userGameData),
                );
              }
            });
        }
      });
  }

  addToCollection() {
    this.gamesService.saveGameToCollection(this.id, this.uid);
  }

  updateData() {
    if (this.userGameData) {
      const userGameData = {
        ref: this.userGameData.ref,
        in_collection: true,
        progress: this.gameForm.value.progress,
        media: this.gameForm.value.media,
      };
      this.usersService.updateGameFromUser(this.uid, userGameData);
    }
  }

  removeFromCollection() {
    this.gamesService.removeGameFromCollection(this.id, this.uid);
  }
}
