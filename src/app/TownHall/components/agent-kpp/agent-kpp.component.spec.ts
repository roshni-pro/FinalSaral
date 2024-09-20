import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentKPPComponent } from './agent-kpp.component';

describe('AgentKPPComponent', () => {
  let component: AgentKPPComponent;
  let fixture: ComponentFixture<AgentKPPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentKPPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentKPPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
