import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KPPDashboardComponent } from './kppdashboard.component';

describe('KPPDashboardComponent', () => {
  let component: KPPDashboardComponent;
  let fixture: ComponentFixture<KPPDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KPPDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KPPDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
