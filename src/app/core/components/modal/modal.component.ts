import { Component, inject, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnDestroy {
  modalService = inject(ModalService);
  isVisible$ = this.modalService.isVisible$;

  @Input() title = 'Modal';
  @Input() state: 'default' | 'danger' | 'warning' | 'success' = 'default';

  closeModal() {
    this.modalService.close();
  }

  ngOnDestroy() {
    this.closeModal();
  }
}
