import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentcomissionsetcitywiseComponent } from './agentcomissionsetcitywise.component';

describe('AgentcomissionsetcitywiseComponent', () => {
  let component: AgentcomissionsetcitywiseComponent;
  let fixture: ComponentFixture<AgentcomissionsetcitywiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentcomissionsetcitywiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentcomissionsetcitywiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
