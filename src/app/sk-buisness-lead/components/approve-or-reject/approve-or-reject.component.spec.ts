import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveOrRejectComponent } from './approve-or-reject.component';

describe('ApproveOrRejectComponent', () => {
  let component: ApproveOrRejectComponent;
  let fixture: ComponentFixture<ApproveOrRejectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveOrRejectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveOrRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
