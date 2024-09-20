import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentnetStockComponent } from './currentnet-stock.component';

describe('CurrentnetStockComponent', () => {
  let component: CurrentnetStockComponent;
  let fixture: ComponentFixture<CurrentnetStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentnetStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentnetStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
