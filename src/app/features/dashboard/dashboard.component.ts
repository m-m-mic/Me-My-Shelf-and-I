import { Component, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { UsersService } from '../../core/services/users.service';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Game } from '../../core/models/game.interface';
import { GamesService } from '../../core/services/games.service';
import { take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  private uid!: string;
  gamesCollection: Game[] = [];
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
                  game
                    .get()
                    .then((result: any) =>
                      this.gamesCollection.push(result.data()),
                    );
                }
              }
            });
        }
      });
  }

  saveGame(gameId: string) {
    this.gamesService.saveGameToCollection(gameId, this.uid);
  }

  removeGame(gameId: string) {
    this.gamesService.removeGameFromCollection(gameId, this.uid);
  }
}
