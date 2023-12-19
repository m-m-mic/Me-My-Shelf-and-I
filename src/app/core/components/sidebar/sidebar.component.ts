import { Component, inject, Input } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { SidebarModule } from 'primeng/sidebar';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { signOut } from '../../states/auth/auth.actions';
import { ionMenu } from '@ng-icons/ionicons';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    DividerModule,
    NgIcon,
    SidebarModule,
    NgIf,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  viewProviders: [provideIcons({ ionMenu })],
})
export class SidebarComponent {
  store = inject(Store);

  @Input() account?: string;

  sidebarVisible = false;

  signOut() {
    this.store.dispatch(signOut());
    this.sidebarVisible = false;
  }
}
