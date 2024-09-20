import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketactivityComponent } from './ticketactivity.component';

describe('TicketactivityComponent', () => {
  let component: TicketactivityComponent;
  let fixture: ComponentFixture<TicketactivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketactivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
