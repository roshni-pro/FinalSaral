import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseQuadrantsComponent } from './warehouse-quadrants.component';

describe('WarehouseQuadrantsComponent', () => {
  let component: WarehouseQuadrantsComponent;
  let fixture: ComponentFixture<WarehouseQuadrantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseQuadrantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseQuadrantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
