import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleExtraloadDetailComponent } from './vehicle-extraload-detail.component';

describe('VehicleExtraloadDetailComponent', () => {
  let component: VehicleExtraloadDetailComponent;
  let fixture: ComponentFixture<VehicleExtraloadDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleExtraloadDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleExtraloadDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
