import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonSellableAndClearanceStocksComponent } from './non-sellable-and-clearance-stocks.component';

describe('NonSellableAndClearanceStocksComponent', () => {
  let component: NonSellableAndClearanceStocksComponent;
  let fixture: ComponentFixture<NonSellableAndClearanceStocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonSellableAndClearanceStocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonSellableAndClearanceStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
