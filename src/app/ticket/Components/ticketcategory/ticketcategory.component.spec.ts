import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketcategoryComponent } from './ticketcategory.component';

describe('TicketcategoryComponent', () => {
  let component: TicketcategoryComponent;
  let fixture: ComponentFixture<TicketcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
