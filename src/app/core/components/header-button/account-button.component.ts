import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionPerson } from '@ng-icons/ionicons';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-account-button',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIconComponent, MenuModule],
  templateUrl: './account-button.component.html',
  styleUrls: ['./account-button.component.scss'],
  viewProviders: [provideIcons({ ionPerson })],
})
export class AccountButtonComponent {
  @Input() account?: string;
  @Input({ required: true }) menuItems!: MenuItem[];
}
