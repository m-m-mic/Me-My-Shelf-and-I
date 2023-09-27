import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-init-recover-password',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
  templateUrl: './init-recover-password.component.html',
  styleUrls: ['./init-recover-password.component.scss'],
})
export class InitRecoverPasswordComponent implements OnChanges {
  @Input() email?: string;

  emailForm = new FormControl('', [Validators.required]);

  ngOnChanges(changes: SimpleChanges) {
    if (this.email) {
      this.emailForm.setValue(this.email);
    }
  }
}
