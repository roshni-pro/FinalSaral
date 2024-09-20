import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesAppdashboardComponent } from './sales-appdashboard.component';

describe('SalesAppdashboardComponent', () => {
  let component: SalesAppdashboardComponent;
  let fixture: ComponentFixture<SalesAppdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesAppdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesAppdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
