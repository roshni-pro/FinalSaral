import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockHistoryPartialComponent } from './stock-history-partial.component';

describe('StockHistoryPartialComponent', () => {
  let component: StockHistoryPartialComponent;
  let fixture: ComponentFixture<StockHistoryPartialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockHistoryPartialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockHistoryPartialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
