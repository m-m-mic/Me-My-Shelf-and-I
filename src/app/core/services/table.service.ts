import { Injectable } from '@angular/core';
import { MediaRow, MediaSort } from '../models/table.interface';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  sortRows(rows: MediaRow[], sortBy: MediaSort) {
    const column = sortBy.column;
    if (column === 'added_on') {
      return rows.sort((row1, row2) => {
        const x = row1[column];
        const y = row2[column];
        if (x < y) {
          return sortBy.direction === 'asc' ? -1 : 1;
        }
        if (x > y) {
          return sortBy.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    } else {
      return rows.sort((row1, row2) => {
        const x = row1[column]?.toLowerCase() ?? '';
        const y = row2[column]?.toLowerCase() ?? '';
        if (x < y) {
          return sortBy.direction === 'asc' ? -1 : 1;
        }
        if (x > y) {
          return sortBy.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
  }

  filterRows(rows: MediaRow[], query: string) {
    if (query.trim() != '') {
      return rows.filter((row) =>
        row.title.toLowerCase().includes(query.toLowerCase()),
      );
    }
    return rows;
  }

  paginateRows(rows: MediaRow[]) {
    const paginatedRows = [];
    const pageSize = 100;
    for (let i = 0; i < rows.length; i += pageSize) {
      paginatedRows.push(rows.slice(i, i + pageSize));
    }
    return paginatedRows;
  }
}
