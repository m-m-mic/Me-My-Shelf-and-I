import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-popover',
  standalone: true,
  imports: [NgClass],
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.scss',
})
export class PopoverComponent {
  @ViewChild('anchor') anchorRef!: ElementRef;
  @ViewChild('content') contentRef!: ElementRef;

  @HostListener('document:mouseup')
  @HostListener('window:scroll')
  @HostListener('document:keydown.enter')
  @HostListener('document:keydown.tab')
  @HostListener('document:keydown.shift.tab')
  handleWindowAndDocumentEvents() {
    if (this.isVisible) {
      this.closePopover();
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: Event) {
    if (this.isVisible) {
      event.preventDefault();
      this.closePopover();
    }
  }

  @HostListener('document:keydown.arrowDown', ['$event'])
  handleArrowDownKey(event: Event) {
    if (this.isVisible) {
      event.preventDefault();
      this.focusNext();
    }
  }

  @HostListener('document:keydown.arrowUp', ['$event'])
  handleArrowUpKey(event: Event) {
    if (this.isVisible) {
      event.preventDefault();
      this.focusPrevious();
    }
  }

  isVisible = false;
  focusIndex = -1;
  focusElements: HTMLElement[] = [];

  openPopover() {
    this.isVisible = true;
    this.anchorRef.nativeElement.focus();
    this.getFocusElements();
  }

  closePopover() {
    this.isVisible = false;
  }

  getFocusElements() {
    this.focusIndex = -1;
    const popoverButtons = Object.values(
      this.contentRef.nativeElement.children,
    ) as HTMLElement[];

    popoverButtons.filter((child) =>
      child.className.includes('popover-button'),
    );

    this.focusElements = popoverButtons;
  }

  focusNext() {
    if (
      !this.focusElements.length ||
      this.focusElements.length - 1 === this.focusIndex
    ) {
      return;
    }

    this.focusIndex += 1;

    this.focusElements[this.focusIndex].focus();
  }

  focusPrevious() {
    if (!this.focusElements.length || this.focusIndex === -1) {
      return;
    }

    this.focusIndex -= 1;

    if (this.focusIndex === -1) {
      this.anchorRef.nativeElement.focus();
    } else {
      this.focusElements[this.focusIndex].focus();
    }
  }
}
