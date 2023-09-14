import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabSelectionComponent } from './tab-selection.component';

describe('MmsaiTabSelectionComponent', () => {
  let component: TabSelectionComponent;
  let fixture: ComponentFixture<TabSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TabSelectionComponent],
    });
    fixture = TestBed.createComponent(TabSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
