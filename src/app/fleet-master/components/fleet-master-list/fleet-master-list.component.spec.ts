import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetMasterListComponent } from './fleet-master-list.component';

describe('FleetMasterListComponent', () => {
  let component: FleetMasterListComponent;
  let fixture: ComponentFixture<FleetMasterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetMasterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
