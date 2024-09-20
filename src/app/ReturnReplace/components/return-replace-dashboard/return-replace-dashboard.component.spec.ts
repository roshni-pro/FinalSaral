import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnReplaceDashboardComponent } from './return-replace-dashboard.component';

describe('ReturnReplaceDashboardComponent', () => {
  let component: ReturnReplaceDashboardComponent;
  let fixture: ComponentFixture<ReturnReplaceDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnReplaceDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnReplaceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
