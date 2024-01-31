import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionPerson } from '@ng-icons/ionicons';
import { PopoverComponent } from '../popover/popover.component';
@Component({
  selector: 'app-account-button',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIconComponent, PopoverComponent],
  templateUrl: './account-button.component.html',
  styleUrls: ['./account-button.component.scss'],
  viewProviders: [provideIcons({ ionPerson })],
})
export class AccountButtonComponent {
  @Input() accountName?: string;
}
