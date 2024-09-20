import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageZoneComponent } from './manage-zone.component';

describe('ManageZoneComponent', () => {
  let component: ManageZoneComponent;
  let fixture: ComponentFixture<ManageZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
