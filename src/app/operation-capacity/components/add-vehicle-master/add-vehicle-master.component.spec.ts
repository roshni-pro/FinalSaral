import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVehicleMasterComponent } from './add-vehicle-master.component';

describe('AddVehicleMasterComponent', () => {
  let component: AddVehicleMasterComponent;
  let fixture: ComponentFixture<AddVehicleMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVehicleMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVehicleMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
