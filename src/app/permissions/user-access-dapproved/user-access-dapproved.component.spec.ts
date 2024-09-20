import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccessDApprovedComponent } from './user-access-dapproved.component';

describe('UserAccessDApprovedComponent', () => {
  let component: UserAccessDApprovedComponent;
  let fixture: ComponentFixture<UserAccessDApprovedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAccessDApprovedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccessDApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
