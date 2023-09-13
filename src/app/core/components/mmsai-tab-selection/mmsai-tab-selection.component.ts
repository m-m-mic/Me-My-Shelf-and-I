import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { DividerModule } from 'primeng/divider';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-mmsai-tab-selection',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MenuModule,
    ButtonModule,
    SidebarModule,
    DividerModule,
    NgIconComponent,
  ],
  templateUrl: './mmsai-tab-selection.component.html',
  styleUrls: ['./mmsai-tab-selection.component.scss'],
})
export class MmsaiTabSelectionComponent {}
