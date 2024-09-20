import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehousemapComponent } from './warehousemap.component';

describe('WarehousemapComponent', () => {
  let component: WarehousemapComponent;
  let fixture: ComponentFixture<WarehousemapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehousemapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehousemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
