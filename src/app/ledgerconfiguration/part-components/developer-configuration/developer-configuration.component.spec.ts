import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperConfigurationComponent } from './developer-configuration.component';

describe('DeveloperConfigurationComponent', () => {
  let component: DeveloperConfigurationComponent;
  let fixture: ComponentFixture<DeveloperConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeveloperConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
