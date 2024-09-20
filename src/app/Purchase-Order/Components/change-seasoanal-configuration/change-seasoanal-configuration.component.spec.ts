import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeSeasoanalConfigurationComponent } from './change-seasoanal-configuration.component';

describe('ChangeSeasoanalConfigurationComponent', () => {
  let component: ChangeSeasoanalConfigurationComponent;
  let fixture: ComponentFixture<ChangeSeasoanalConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeSeasoanalConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeSeasoanalConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
