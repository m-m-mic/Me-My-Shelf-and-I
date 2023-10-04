import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MediaTableComponent } from '../../core/components/media-table/media-table.component';
import { GameRow } from '../../core/models/game.interface';

@Component({
  standalone: true,
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  imports: [RouterLink, MediaTableComponent],
})
export class LandingPageComponent {
  rows: GameRow[] = [
    {
      format: 'Physical',
      title: 'Metroid Prime',
      progress: 'Completed',
      platform: 'GameCube',
      id: 'sdoasd',
      added_on: 0,
    },
    {
      title: 'Super Mario 64',
      progress: 'Completed',
      platform: 'N64',
      format: 'Physical',
      id: 'asdas',
      added_on: 0,
    },
  ];
}
