import { Component } from '@angular/core';
import {
  GuardsCheckEnd,
  GuardsCheckStart,
  NavigationCancel,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { FooterComponent } from './core/layout/footer/footer.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { LoadingComponent } from './core/layout/loading/loading.component';
import { NgIf } from '@angular/common';
import { ModalComponent } from './core/components/modal/modal.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    RouterOutlet,
    FooterComponent,
    RouterLink,
    HeaderComponent,
    LoadingComponent,
    NgIf,
    ModalComponent,
  ],
})
export class AppComponent {
  loading!: boolean;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof GuardsCheckStart) {
        this.loading = true;
      }
      if (
        event instanceof GuardsCheckEnd ||
        event instanceof NavigationCancel
      ) {
        this.loading = false;
      }
    });
  }
}
