import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickerStatisticComponent } from './picker-statistic.component';

describe('PickerStatisticComponent', () => {
  let component: PickerStatisticComponent;
  let fixture: ComponentFixture<PickerStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickerStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickerStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
