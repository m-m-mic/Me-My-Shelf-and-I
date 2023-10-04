import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaColumn, MediaRow, MediaSort } from '../../models/table.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SortButtonComponent } from '../sort-button/sort-button.component';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionClose } from '@ng-icons/ionicons';

@Component({
  selector: 'app-media-table',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SortButtonComponent,
    RouterLink,
    NgIconComponent,
  ],
  templateUrl: './media-table.component.html',
  styleUrls: ['./media-table.component.scss'],

  viewProviders: [provideIcons({ ionClose })],
})
export class MediaTableComponent {
  @Input() rows: MediaRow[] = [];
  @Input() mediaType: 'game' | 'movie' | 'album' = 'game';
  sortBy: MediaSort = { column: 'title', direction: 'asc' };
  query = new FormControl('');

  toggleSort(sort: MediaColumn) {
    if (sort === this.sortBy.column && this.sortBy.direction === 'asc') {
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
  }

  get sortedRows(): MediaRow[] {
    let sortedRows: MediaRow[];
    const column = this.sortBy.column;

    if (column === 'added_on') {
      sortedRows = this.rows.sort((row1, row2) => {
        const x = row1[column];
        const y = row2[column];
        if (x < y) {
          return this.sortBy.direction === 'asc' ? -1 : 1;
        }
        if (x > y) {
          return this.sortBy.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    } else {
      sortedRows = this.rows.sort((row1, row2) => {
        const x = row1[column]?.toLowerCase() ?? '';
        const y = row2[column]?.toLowerCase() ?? '';
        if (x < y) {
          return this.sortBy.direction === 'asc' ? -1 : 1;
        }
        if (x > y) {
          return this.sortBy.direction === 'asc' ? 1 : -1;
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

  formatLink(id: string) {
    return `/${this.mediaType}s/${id}`;
  }

  formatDate(date: number) {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
