import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickerMongoOrderComponent } from './picker-mongo-order.component';

describe('PickerMongoOrderComponent', () => {
  let component: PickerMongoOrderComponent;
  let fixture: ComponentFixture<PickerMongoOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickerMongoOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickerMongoOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
