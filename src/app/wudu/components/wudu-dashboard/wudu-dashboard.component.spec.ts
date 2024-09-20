import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WuduDashboardComponent } from './wudu-dashboard.component';

describe('WuduDashboardComponent', () => {
  let component: WuduDashboardComponent;
  let fixture: ComponentFixture<WuduDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WuduDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WuduDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
