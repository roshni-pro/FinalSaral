import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesIntentApprovalComponent } from './sales-intent-approval.component';

describe('SalesIntentApprovalComponent', () => {
  let component: SalesIntentApprovalComponent;
  let fixture: ComponentFixture<SalesIntentApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesIntentApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesIntentApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
