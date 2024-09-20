import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestToBeApprovedComponent } from './request-to-be-approved.component';

describe('RequestToBeApprovedComponent', () => {
  let component: RequestToBeApprovedComponent;
  let fixture: ComponentFixture<RequestToBeApprovedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestToBeApprovedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestToBeApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
