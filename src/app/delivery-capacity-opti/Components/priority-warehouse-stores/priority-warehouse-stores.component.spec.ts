import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityWarehouseStoresComponent } from './priority-warehouse-stores.component';

describe('PriorityWarehouseStoresComponent', () => {
  let component: PriorityWarehouseStoresComponent;
  let fixture: ComponentFixture<PriorityWarehouseStoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriorityWarehouseStoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityWarehouseStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
