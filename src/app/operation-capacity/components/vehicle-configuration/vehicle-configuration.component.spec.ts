import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleConfigurationComponent } from './vehicle-configuration.component';

describe('VehicleConfigurationComponent', () => {
  let component: VehicleConfigurationComponent;
  let fixture: ComponentFixture<VehicleConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
