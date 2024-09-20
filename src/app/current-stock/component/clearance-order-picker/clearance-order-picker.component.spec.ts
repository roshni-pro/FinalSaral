import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearanceOrderPickerComponent } from './clearance-order-picker.component';

describe('ClearanceOrderPickerComponent', () => {
  let component: ClearanceOrderPickerComponent;
  let fixture: ComponentFixture<ClearanceOrderPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClearanceOrderPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearanceOrderPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
