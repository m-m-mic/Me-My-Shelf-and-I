import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmsaiAccountButtonComponent } from './mmsai-account-button.component';

describe('MmsaiAccountButtonComponent', () => {
  let component: MmsaiAccountButtonComponent;
  let fixture: ComponentFixture<MmsaiAccountButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MmsaiAccountButtonComponent]
    });
    fixture = TestBed.createComponent(MmsaiAccountButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
