import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../core/services/authentication.service';
import { map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DividerModule } from 'primeng/divider';
import { ChangeDisplayNameComponent } from '../../core/components/change-display-name/change-display-name.component';
import { ChangePasswordComponent } from '../../core/components/change-password/change-password.component';
import { DeleteAccountComponent } from '../../core/components/delete-account/delete-account.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    DividerModule,
    ChangeDisplayNameComponent,
    ChangePasswordComponent,
    DeleteAccountComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  authenticationService = inject(AuthenticationService);

  email$ = this.authenticationService.authUser$.pipe(
    takeUntilDestroyed(),
    map((user) => user?.email ?? ''),
  );
  displayName$ = this.authenticationService.authUser$.pipe(
    takeUntilDestroyed(),
    map((user) => user?.displayName ?? ''),
  );
}
