import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InitRecoverPasswordComponent } from '../../core/components/init-recover-password/init-recover-password.component';

@Component({
  selector: 'app-auth-management',
  standalone: true,
  imports: [CommonModule, InitRecoverPasswordComponent],
  templateUrl: './auth-management.component.html',
  styleUrls: ['./auth-management.component.scss'],
})
export class AuthManagementComponent {
  mode?: string;
  email?: string;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.pipe(takeUntilDestroyed()).subscribe((params) => {
      if (!params) return;
      this.mode = params['mode'];
      this.email = params['email'];
    });
  }
}
