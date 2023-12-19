import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MediaRow,
  MediaSort,
  MediaSortColumn,
} from '../../models/table.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SortButtonComponent } from '../sort-button/sort-button.component';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionClose } from '@ng-icons/ionicons';
import { TableService } from '../../services/table.service';
import { MediaCategory } from '../../models/media.interface';

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
  @Input() category: MediaCategory = MediaCategory.GAMES;
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
    switch (this.category) {
      case MediaCategory.GAMES:
        return 'Search for Games...';
      case MediaCategory.MOVIES:
        return 'Search for Movies...';
      case MediaCategory.ALBUMS:
        return 'Search for Albums...';
    }
  }

  getRowIndex(index: number) {
    return index + 1 + this.currentPage * 100;
  }

  formatLink(id: string) {
    return `/${this.category}/${id}`;
  }

  formatDate(date: number) {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  protected readonly MediaCategory = MediaCategory;
}
