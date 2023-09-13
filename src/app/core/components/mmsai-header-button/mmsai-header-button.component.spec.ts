import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmsaiHeaderButtonComponent } from './mmsai-header-button.component';

describe('MmsaiAccountButtonComponent', () => {
  let component: MmsaiHeaderButtonComponent;
  let fixture: ComponentFixture<MmsaiHeaderButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MmsaiHeaderButtonComponent],
    });
    fixture = TestBed.createComponent(MmsaiHeaderButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
