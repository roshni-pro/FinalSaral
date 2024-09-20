import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedispatchApprovalComponent } from './redispatch-approval.component';

describe('RedispatchApprovalComponent', () => {
  let component: RedispatchApprovalComponent;
  let fixture: ComponentFixture<RedispatchApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedispatchApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedispatchApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
