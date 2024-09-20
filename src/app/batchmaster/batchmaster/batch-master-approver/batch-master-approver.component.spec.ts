import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchMasterApproverComponent } from './batch-master-approver.component';

describe('BatchMasterApproverComponent', () => {
  let component: BatchMasterApproverComponent;
  let fixture: ComponentFixture<BatchMasterApproverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchMasterApproverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchMasterApproverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
