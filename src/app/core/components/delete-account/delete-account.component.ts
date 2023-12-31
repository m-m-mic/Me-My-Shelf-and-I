import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from '../../services/modal.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { DeletionService } from '../../services/deletion.service';
import { AuthValidator } from '../../../shared/validators/auth.validator';

@Component({
  selector: 'app-delete-account',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    ConfirmDialogModule,
    ModalComponent,
    InputTextModule,
    ReactiveFormsModule,
  ],
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss'],
})
export class DeleteAccountComponent {
  modalService = inject(ModalService);
  deletionService = inject(DeletionService);
  authenticationService = inject(AuthenticationService);
  router = inject(Router);

  deletionFormControl = new FormControl('', {
    validators: Validators.required,
    asyncValidators: AuthValidator.checkPassword(this.authenticationService),
    updateOn: 'blur',
  });
  isDeleting = false;

  openModal() {
    this.modalService.open();
  }

  async deleteAccount() {
    this.isDeleting = true;
    try {
      await this.deletionService.delete();
    } catch {
      this.isDeleting = false;
    }
  }
}
