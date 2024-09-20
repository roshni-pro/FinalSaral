import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyModuleComponent } from './survey-module.component';

describe('SurveyModuleComponent', () => {
  let component: SurveyModuleComponent;
  let fixture: ComponentFixture<SurveyModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
