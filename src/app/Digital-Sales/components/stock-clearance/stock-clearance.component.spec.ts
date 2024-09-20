import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockClearanceComponent } from './stock-clearance.component';

describe('StockClearanceComponent', () => {
  let component: StockClearanceComponent;
  let fixture: ComponentFixture<StockClearanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockClearanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockClearanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
