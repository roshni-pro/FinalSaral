import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsAppTemplateComponent } from './whats-app-template.component';

describe('WhatsAppTemplateComponent', () => {
  let component: WhatsAppTemplateComponent;
  let fixture: ComponentFixture<WhatsAppTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatsAppTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatsAppTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
