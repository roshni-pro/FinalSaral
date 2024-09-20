import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicledailyreportComponent } from './vehicledailyreport.component';

describe('VehicledailyreportComponent', () => {
  let component: VehicledailyreportComponent;
  let fixture: ComponentFixture<VehicledailyreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicledailyreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicledailyreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
