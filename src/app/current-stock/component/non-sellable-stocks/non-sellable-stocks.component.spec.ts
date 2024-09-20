import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonSellableStocksComponent } from './non-sellable-stocks.component';

describe('NonSellableStocksComponent', () => {
  let component: NonSellableStocksComponent;
  let fixture: ComponentFixture<NonSellableStocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonSellableStocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonSellableStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
