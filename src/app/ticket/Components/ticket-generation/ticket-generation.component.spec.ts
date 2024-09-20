import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketGenerationComponent } from './ticket-generation.component';

describe('TicketGenerationComponent', () => {
  let component: TicketGenerationComponent;
  let fixture: ComponentFixture<TicketGenerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketGenerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
