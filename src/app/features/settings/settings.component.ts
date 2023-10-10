import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../core/services/authentication.service';
import { map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DividerModule } from 'primeng/divider';
import { ChangeDisplayNameComponent } from '../../core/components/change-display-name/change-display-name.component';
import { ChangePasswordComponent } from '../../core/components/change-password/change-password.component';
import { Title } from '@angular/platform-browser';
import { convertTitle } from '../../shared/converters/title.converter';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    DividerModule,
    ChangeDisplayNameComponent,
    ChangePasswordComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  authenticationService = inject(AuthenticationService);
  title = inject(Title);

  email$ = this.authenticationService.authUser$.pipe(
    takeUntilDestroyed(),
    map((user) => user?.email ?? ''),
  );
  displayName$ = this.authenticationService.authUser$.pipe(
    takeUntilDestroyed(),
    map((user) => user?.displayName ?? ''),
  );

  ngOnInit() {
    this.title.setTitle(convertTitle('Settings'));
  }
}
