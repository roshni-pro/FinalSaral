import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCapacityEnhancementComponent } from './vehicle-capacity-enhancement.component';

describe('VehicleCapacityEnhancementComponent', () => {
  let component: VehicleCapacityEnhancementComponent;
  let fixture: ComponentFixture<VehicleCapacityEnhancementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleCapacityEnhancementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleCapacityEnhancementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
