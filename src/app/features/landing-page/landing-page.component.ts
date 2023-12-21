import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  imports: [RouterLink, ButtonModule],
})
export class LandingPageComponent {
  router = inject(Router);

  toSignUp() {
    this.router.navigate(['/sign-up']);
  }

  toSignIn() {
    this.router.navigate(['/sign-in']);
  }
}
