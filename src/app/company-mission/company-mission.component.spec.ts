import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyMissionComponent } from './company-mission.component';

describe('CompanyMissionComponent', () => {
  let component: CompanyMissionComponent;
  let fixture: ComponentFixture<CompanyMissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyMissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
