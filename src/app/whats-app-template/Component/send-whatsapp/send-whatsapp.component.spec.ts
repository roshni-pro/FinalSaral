import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendWhatsappComponent } from './send-whatsapp.component';

describe('SendWhatsappComponent', () => {
  let component: SendWhatsappComponent;
  let fixture: ComponentFixture<SendWhatsappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendWhatsappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
