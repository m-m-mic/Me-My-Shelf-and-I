import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-mmsai-tab-selection',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './mmsai-tab-selection.component.html',
  styleUrls: ['./mmsai-tab-selection.component.scss'],
})
export class MmsaiTabSelectionComponent {}
