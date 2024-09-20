import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { POApprovalDetailComponent } from './poapproval-detail.component';

describe('POApprovalDetailComponent', () => {
  let component: POApprovalDetailComponent;
  let fixture: ComponentFixture<POApprovalDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ POApprovalDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(POApprovalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
