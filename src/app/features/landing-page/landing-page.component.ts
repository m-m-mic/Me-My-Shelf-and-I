import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MediaColumn } from '../../core/models/table.interface';
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
  columns: MediaColumn[] = [
    { field: 'title', label: 'Title', className: 'title-row', sortable: true },
    {
      field: 'platform',
      label: 'Platform',
      className: 'platform-row',
      sortable: true,
    },
    {
      field: 'progress',
      label: 'Progress',
      className: 'progress-row',
      sortable: true,
    },
    {
      field: 'format',
      label: 'Format',
      className: 'format-row',
      sortable: true,
    },
  ];

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
