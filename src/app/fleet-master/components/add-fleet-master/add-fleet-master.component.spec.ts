import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFleetMasterComponent } from './add-fleet-master.component';

describe('AddFleetMasterComponent', () => {
  let component: AddFleetMasterComponent;
  let fixture: ComponentFixture<AddFleetMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFleetMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFleetMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
