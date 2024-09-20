import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderCloseRequestComponent } from './purchase-order-close-request.component';

describe('PurchaseOrderCloseRequestComponent', () => {
  let component: PurchaseOrderCloseRequestComponent;
  let fixture: ComponentFixture<PurchaseOrderCloseRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrderCloseRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderCloseRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
