import { Component, DestroyRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesService } from '../../core/services/games.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { take, throwError } from 'rxjs';
import { GameType, UserGameType } from '../../core/models/game.interface';
import { UsersService } from '../../core/services/users.service';
import { AuthenticationService } from '../../core/services/authentication.service';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { createGameForm, createGameObject } from './game.form';
import { gameItems } from './game.items';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextareaModule } from 'primeng/inputtextarea';

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
    private router: Router,
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
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((game) => {
        if (game) {
          this.gameData = game;
        } else {
          this.router.navigate(['/404']);
        }
      });
  }

  getUserGameData() {
    this.authenticationService
      .getUser()
      .pipe(take(1))
      .subscribe((user) => {
        if (user) {
          this.uid = user.uid;
          this.usersService
            .getUser(this.uid)
            .pipe(takeUntilDestroyed(this.destroyRef))
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
        } else {
          throwError(() => new Error('Could not find user'));
        }
      });
  }

  addToCollection() {
    this.gamesService.saveGameToCollection(this.id, this.uid);
  }

  updateData() {
    if (this.userGameData) {
      this.usersService.updateGameFromUser(
        this.uid,
        createGameObject(this.userGameData.ref, this.gameForm),
      );
    }
  }

  removeFromCollection() {
    this.gamesService.removeGameFromCollection(this.id, this.uid);
  }
}
