import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MediaSortColumn,
  MediaRow,
  MediaSort,
} from '../../models/table.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SortButtonComponent } from '../sort-button/sort-button.component';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionClose } from '@ng-icons/ionicons';
import { TableService } from '../../services/table.service';

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
  tableService = inject(TableService);

  @Input() rows: MediaRow[] = [];
  @Input() mediaType: 'game' | 'movie' | 'album' = 'game';
  sortBy: MediaSort = { column: 'title', direction: 'asc' };
  queryFormControl = new FormControl('');
  currentPage = 0;

  toggleSort(sort: MediaSortColumn) {
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

  rowArray() {
    let modifiedRows = this.tableService.sortRows(this.rows, this.sortBy);
    modifiedRows = this.tableService.filterRows(
      modifiedRows,
      this.queryFormControl.value ?? '',
    );
    const paginatedRows = this.tableService.paginateRows(modifiedRows);

    if (this.currentPage > paginatedRows.length - 1)
      this.currentPage = paginatedRows.length - 1;

    if (paginatedRows.length === 0) this.currentPage = 0;

    return paginatedRows;
  }

  get placeholder() {
    switch (this.mediaType) {
      case 'game':
        return 'Search for Games...';
      case 'movie':
        return 'Search for Movies...';
      case 'album':
        return 'Search for Albums...';
    }
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
