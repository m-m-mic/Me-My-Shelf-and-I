import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  isVisible = new BehaviorSubject(false);
  isVisible$ = this.isVisible.asObservable();

  open() {
    this.isVisible.next(true);
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.isVisible.next(false);
    document.body.style.overflow = 'unset';
  }
}
