import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DboyAssignmentSummaryComponent } from './dboy-assignment-summary.component';

describe('DboyAssignmentSummaryComponent', () => {
  let component: DboyAssignmentSummaryComponent;
  let fixture: ComponentFixture<DboyAssignmentSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DboyAssignmentSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DboyAssignmentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
