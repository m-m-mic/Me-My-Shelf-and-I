import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmsaiTabSelectionComponent } from './mmsai-tab-selection.component';

describe('MmsaiTabSelectionComponent', () => {
  let component: MmsaiTabSelectionComponent;
  let fixture: ComponentFixture<MmsaiTabSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MmsaiTabSelectionComponent]
    });
    fixture = TestBed.createComponent(MmsaiTabSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
