import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreTargetDashboardComponent } from './store-target-dashboard.component';

describe('StoreTargetDashboardComponent', () => {
  let component: StoreTargetDashboardComponent;
  let fixture: ComponentFixture<StoreTargetDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreTargetDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreTargetDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
