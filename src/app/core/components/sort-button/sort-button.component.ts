import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaColumn, MediaSort } from '../../models/table.interface';
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
export class SortButtonComponent implements OnChanges {
  @Input({ required: true }) column!: MediaColumn;
  @Input({ required: true }) sort!: MediaSort;
  currentDirection: 'asc' | 'desc' | 'none' = 'none';

  ngOnChanges(changes: SimpleChanges) {
    if (this.column === this.sort.column) {
      this.currentDirection = this.sort.direction ?? 'none';
    } else {
      this.currentDirection = 'none';
    }
  }
}
