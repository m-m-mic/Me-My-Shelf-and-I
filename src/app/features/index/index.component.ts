import { Component } from '@angular/core';
import { LandingPageComponent } from '../landing-page/landing-page.component';

@Component({
  standalone: true,
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  imports: [LandingPageComponent],
})
export class IndexComponent {}
