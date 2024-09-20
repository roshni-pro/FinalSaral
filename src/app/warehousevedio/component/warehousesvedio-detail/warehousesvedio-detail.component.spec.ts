import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehousesvedioDetailComponent } from './warehousesvedio-detail.component';

describe('WarehousesvedioDetailComponent', () => {
  let component: WarehousesvedioDetailComponent;
  let fixture: ComponentFixture<WarehousesvedioDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehousesvedioDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehousesvedioDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
