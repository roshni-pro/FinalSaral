import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentPitchComponent } from './agent-pitch.component';

describe('AgentPitchComponent', () => {
  let component: AgentPitchComponent;
  let fixture: ComponentFixture<AgentPitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentPitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentPitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
