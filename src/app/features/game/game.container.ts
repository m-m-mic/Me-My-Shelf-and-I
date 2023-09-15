import { Component, DestroyRef } from '@angular/core';
import { GameComponent } from './game.component';
import { GamesService } from '../../core/services/games.service';
import { UsersService } from '../../core/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { Observable, take } from 'rxjs';
import { Game, UserGame } from '../../core/models/game.interface';
import { AuthenticationService } from '../../core/services/authentication.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { fillGameForm } from './game.form';

@Component({
  standalone: true,
  imports: [GameComponent, AsyncPipe],
  template: `
    <app-game
      [id]="gameId"
      [gameData]="(gameData$ | async) ?? undefined"
      [userGameData]="userGameData"
      [gameForm]="gameForm" />
  `,
  styles: [':host { flex: 1 }'],
})
export class GameContainerComponent {
  gameId!: string;
  gameData$?: Observable<Game | undefined>;
  userGameData?: UserGame;
  gameForm: FormGroup = this.createGameForm();

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
      if (paramId) {
        this.gameId = paramId;
        this.gameData$ = this.gamesService.get(this.gameId);
        // TODO: Find better alternative
        this.authenticationService
          .getUser()
          .pipe(take(1))
          .subscribe((authUser) =>
            this.usersService
              .get(authUser?.uid)
              .pipe(takeUntilDestroyed(destroyRef))
              .subscribe((user) => {
                if (user) {
                  user.collection.games.filter((game) => {
                    if (game.ref.id === this.gameId) this.userGameData = game;
                  });
                  this.gameForm = formBuilder.group(
                    fillGameForm(this.userGameData),
                  );
                }
              }),
          );
      }
    });
  }

  createGameForm() {
    return this.formBuilder.group(fillGameForm());
  }
}
