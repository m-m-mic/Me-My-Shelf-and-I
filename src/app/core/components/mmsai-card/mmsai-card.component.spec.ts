import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmsaiCardComponent } from './mmsai-card.component';

describe('MmsaiCardComponent', () => {
  let component: MmsaiCardComponent;
  let fixture: ComponentFixture<MmsaiCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MmsaiCardComponent]
    });
    fixture = TestBed.createComponent(MmsaiCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
