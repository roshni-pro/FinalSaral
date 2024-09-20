import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonSellableOrderComponent } from './non-sellable-order.component';

describe('NonSellableOrderComponent', () => {
  let component: NonSellableOrderComponent;
  let fixture: ComponentFixture<NonSellableOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonSellableOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonSellableOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
