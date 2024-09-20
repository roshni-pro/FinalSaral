import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HqStockMovementRequestComponent } from './hq-stock-movement-request.component';

describe('HqStockMovementRequestComponent', () => {
  let component: HqStockMovementRequestComponent;
  let fixture: ComponentFixture<HqStockMovementRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HqStockMovementRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HqStockMovementRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
