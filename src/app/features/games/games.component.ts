import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesService } from '../../core/services/games.service';
import { GameWithId } from '../../core/models/game.interface';
import { GameCardComponent } from '../../core/components/game-card/game-card.component';
import { AuthenticationService } from '../../core/services/authentication.service';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, GameCardComponent],
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent {
  gamesList: GameWithId[] = [];
  uid!: string;

  constructor(
    private gamesService: GamesService,
    private authenticationService: AuthenticationService,
  ) {
    this.gamesService.getAll().then((games) => (this.gamesList = games));
    this.authenticationService
      .getUser()
      .pipe(take(1))
      .subscribe((user) => {
        if (user) this.uid = user.uid;
      });
  }
}
