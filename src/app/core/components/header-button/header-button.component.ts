import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionMenu, ionPerson } from '@ng-icons/ionicons';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { SidebarModule } from 'primeng/sidebar';
import { Store } from '@ngrx/store';
import { signOut } from '../../states/auth/auth.actions';

@Component({
  selector: 'app-header-button',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgIconComponent,
    MenuModule,
    DividerModule,
    SidebarModule,
  ],
  templateUrl: './header-button.component.html',
  styleUrls: ['./header-button.component.scss'],
  viewProviders: [provideIcons({ ionPerson, ionMenu })],
})
export class HeaderButtonComponent {
  store = inject(Store);

  @Input() isLoggedIn = false;
  @Input() displayName = 'Account';
  @Input() menuItems!: MenuItem[];

  sidebarVisible = false;

  signOut() {
    this.store.dispatch(signOut());
    this.sidebarVisible = false;
  }
}
