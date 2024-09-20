import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicStockListComponent } from './dynamic-stock-list.component';

describe('DynamicStockListComponent', () => {
  let component: DynamicStockListComponent;
  let fixture: ComponentFixture<DynamicStockListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicStockListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicStockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
