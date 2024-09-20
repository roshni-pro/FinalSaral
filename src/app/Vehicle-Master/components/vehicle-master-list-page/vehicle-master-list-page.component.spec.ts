import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleMasterListPageComponent } from './vehicle-master-list-page.component';

describe('VehicleMasterListPageComponent', () => {
  let component: VehicleMasterListPageComponent;
  let fixture: ComponentFixture<VehicleMasterListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleMasterListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleMasterListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
