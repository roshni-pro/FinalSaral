import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesReturnDashboardComponent } from './sales-return-dashboard.component';

describe('SalesReturnDashboardComponent', () => {
  let component: SalesReturnDashboardComponent;
  let fixture: ComponentFixture<SalesReturnDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesReturnDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesReturnDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
