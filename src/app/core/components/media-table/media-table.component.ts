import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRow } from '../../models/game.interface';

@Component({
  selector: 'app-media-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media-table.component.html',
  styleUrls: ['./media-table.component.scss'],
})
export class MediaTableComponent {
  @Input() rows: GameRow[] = [];
  sortedRows: GameRow[] = [];
  sortBy: 'title' | 'platform' | 'progress' | 'format' | 'none' = 'none';

  toggleSort(sort: string) {}
}
