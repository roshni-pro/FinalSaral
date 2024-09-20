import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EwayBillOrderComponent } from './eway-bill-order.component';

describe('EwayBillOrderComponent', () => {
  let component: EwayBillOrderComponent;
  let fixture: ComponentFixture<EwayBillOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EwayBillOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EwayBillOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
