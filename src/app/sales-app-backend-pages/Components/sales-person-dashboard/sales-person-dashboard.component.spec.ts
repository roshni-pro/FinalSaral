import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesPersonDashboardComponent } from './sales-person-dashboard.component';

describe('SalesPersonDashboardComponent', () => {
  let component: SalesPersonDashboardComponent;
  let fixture: ComponentFixture<SalesPersonDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesPersonDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesPersonDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
