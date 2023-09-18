import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [ngStyle]="{
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        height: height + 'px'
      }">
      <span
        class="pi pi-spin pi-spinner"
        style="font-size: 1.6rem; height: 1.6rem;"></span>
    </div>
  `,
})
export class LoadingComponent {
  @Input() height = 250;
}
