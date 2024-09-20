import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintTicketComponent } from './complaint-ticket.component';

describe('ComplaintTicketComponent', () => {
  let component: ComplaintTicketComponent;
  let fixture: ComponentFixture<ComplaintTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
