import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearanceNonChangeRequestComponent } from './clearance-non-change-request.component';

describe('ClearanceNonChangeRequestComponent', () => {
  let component: ClearanceNonChangeRequestComponent;
  let fixture: ComponentFixture<ClearanceNonChangeRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClearanceNonChangeRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearanceNonChangeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
