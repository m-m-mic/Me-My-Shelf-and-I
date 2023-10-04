import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRow } from '../../models/game.interface';
import { MediaColumn, MediaSort } from '../../models/table.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SortButtonComponent } from '../sort-button/sort-button.component';

@Component({
  selector: 'app-media-table',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SortButtonComponent],
  templateUrl: './media-table.component.html',
  styleUrls: ['./media-table.component.scss'],
})
export class MediaTableComponent {
  @Input() rows: GameRow[] = [];
  sortBy: MediaSort = { column: 'title', direction: 'asc' };
  query = new FormControl('');

  toggleSort(sort: MediaColumn) {
    if (sort === this.sortBy.column) {
      if (sort === this.sortBy.column || this.sortBy.direction === 'asc') {
        this.sortBy = {
          column: sort,
          direction: 'desc',
        };
      } else {
        this.sortBy = {
          column: sort,
          direction: 'asc',
        };
      }
    } else {
      this.sortBy = {
        column: sort,
        direction: 'asc',
      };
    }
  }

  get sortedRows(): GameRow[] {
    let sortedRows = this.rows;
    const column = this.sortBy.column;
    if (this.sortBy.direction === 'asc') {
      sortedRows = this.rows.sort(function (row1, row2) {
        // @ts-ignore
        const x = row1[column].toLowerCase();
        // @ts-ignore
        const y = row2[column].toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
    } else if (this.sortBy.direction === 'desc') {
      sortedRows = this.rows.sort(function (row1, row2) {
        // @ts-ignore
        const x = row1[column].toLowerCase();
        // @ts-ignore
        const y = row2[column].toLowerCase();
        if (x > y) {
          return -1;
        }
        if (x < y) {
          return 1;
        }
        return 0;
      });
    }

    if (this.query.value && this.query.value?.trim() != '') {
      sortedRows = sortedRows.filter((row) =>
        row.title.toLowerCase().includes(this.query.value?.toLowerCase() ?? ''),
      );
    }
    return sortedRows;
  }
}
