import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionPerson } from '@ng-icons/ionicons';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-mmsai-account-button',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIconComponent, MenuModule],
  templateUrl: './mmsai-account-button.component.html',
  styleUrls: ['./mmsai-account-button.component.scss'],
  viewProviders: [provideIcons({ ionPerson })],
})
export class MmsaiAccountButtonComponent {
  @Input() isLoggedIn!: boolean;
  @Input() displayName!: string | null | undefined;
  @Input() menuItems!: MenuItem[];
}
