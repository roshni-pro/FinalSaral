import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentcomissionsetcitywiseAddComponent } from './agentcomissionsetcitywise-add.component';

describe('AgentcomissionsetcitywiseAddComponent', () => {
  let component: AgentcomissionsetcitywiseAddComponent;
  let fixture: ComponentFixture<AgentcomissionsetcitywiseAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentcomissionsetcitywiseAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentcomissionsetcitywiseAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
