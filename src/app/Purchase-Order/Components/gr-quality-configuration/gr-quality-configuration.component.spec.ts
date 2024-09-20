import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrQualityConfigurationComponent } from './gr-quality-configuration.component';

describe('GrQualityConfigurationComponent', () => {
  let component: GrQualityConfigurationComponent;
  let fixture: ComponentFixture<GrQualityConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrQualityConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrQualityConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
