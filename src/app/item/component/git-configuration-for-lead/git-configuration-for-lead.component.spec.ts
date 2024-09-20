import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GitConfigurationForLeadComponent } from './git-configuration-for-lead.component';

describe('GitConfigurationForLeadComponent', () => {
  let component: GitConfigurationForLeadComponent;
  let fixture: ComponentFixture<GitConfigurationForLeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GitConfigurationForLeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GitConfigurationForLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
