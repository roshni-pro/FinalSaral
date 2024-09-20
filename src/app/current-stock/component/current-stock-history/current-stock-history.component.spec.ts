import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentStockHistoryComponent } from './current-stock-history.component';

describe('CurrentStockHistoryComponent', () => {
  let component: CurrentStockHistoryComponent;
  let fixture: ComponentFixture<CurrentStockHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentStockHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentStockHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
