import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaSortColumn, MediaSort } from '../../models/table.interface';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionArrowDown, ionArrowUp } from '@ng-icons/ionicons';

@Component({
  selector: 'app-sort-button',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './sort-button.component.html',
  styleUrls: ['./sort-button.component.scss'],
  viewProviders: [provideIcons({ ionArrowUp, ionArrowDown })],
})
export class SortButtonComponent {
  @Input({ required: true }) column!: MediaSortColumn;
  @Input({ required: true }) sort!: MediaSort;

  get currentDirection(): 'asc' | 'desc' | 'none' {
    if (this.column === this.sort.column) {
      return this.sort.direction;
    } else {
      return 'none';
    }
  }
}
