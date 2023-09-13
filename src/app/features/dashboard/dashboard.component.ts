import { Component, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { UsersService } from '../../core/services/users.service';
import { AuthenticationService } from '../../core/services/authentication.service';
import {
  GameType,
  GameTypeWithId,
  UserGameType,
} from '../../core/models/game.interface';
import { GamesService } from '../../core/services/games.service';
import { take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MmsaiCardComponent } from '../../core/components/mmsai-card/mmsai-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ButtonModule, MmsaiCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  private uid!: string;
  gamesCollection: { general: GameTypeWithId; user: UserGameType }[] = [];
  constructor(
    private authenticationService: AuthenticationService,
    private usersService: UsersService,
    private gamesService: GamesService,
    private destroyRef: DestroyRef,
  ) {
    this.authenticationService
      .getUser()
      .pipe(take(1))
      .subscribe((user) => {
        if (user) {
          this.usersService
            .getUser(user.uid)
            .pipe(takeUntilDestroyed(destroyRef))
            .subscribe((value) => {
              if (value) {
                this.uid = user.uid;
                this.gamesCollection = [];
                for (const game of value.collection.games) {
                  if (game.in_collection) {
                    game.ref.get().then((result) =>
                      this.gamesCollection.push({
                        general: {
                          ...result.data(),
                          id: game.ref.id,
                        } as GameTypeWithId,
                        user: game,
                      }),
                    );
                  }
                }
              }
            });
        }
      });
  }
}
