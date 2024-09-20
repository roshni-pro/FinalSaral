import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmPlatformConfigurationComponent } from './crm-platform-configuration.component';

describe('CrmPlatformConfigurationComponent', () => {
  let component: CrmPlatformConfigurationComponent;
  let fixture: ComponentFixture<CrmPlatformConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmPlatformConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmPlatformConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
