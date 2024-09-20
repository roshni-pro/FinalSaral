import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentcollectionComponent } from './agentcollection.component';

describe('AgentcollectionComponent', () => {
  let component: AgentcollectionComponent;
  let fixture: ComponentFixture<AgentcollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentcollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentcollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
