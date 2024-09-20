import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesterConfigurationComponent } from './tester-configuration.component';

describe('TesterConfigurationComponent', () => {
  let component: TesterConfigurationComponent;
  let fixture: ComponentFixture<TesterConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesterConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesterConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
