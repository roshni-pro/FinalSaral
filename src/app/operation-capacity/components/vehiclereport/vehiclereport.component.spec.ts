import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclereportComponent } from './vehiclereport.component';

describe('VehiclereportComponent', () => {
  let component: VehiclereportComponent;
  let fixture: ComponentFixture<VehiclereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiclereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
