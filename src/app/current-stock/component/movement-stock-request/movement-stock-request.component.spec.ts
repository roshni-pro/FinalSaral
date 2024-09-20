import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementStockRequestComponent } from './movement-stock-request.component';

describe('MovementStockRequestComponent', () => {
  let component: MovementStockRequestComponent;
  let fixture: ComponentFixture<MovementStockRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovementStockRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementStockRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
