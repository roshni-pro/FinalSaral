import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaruriappDashboardComponent } from './zaruriapp-dashboard.component';

describe('ZaruriappDashboardComponent', () => {
  let component: ZaruriappDashboardComponent;
  let fixture: ComponentFixture<ZaruriappDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZaruriappDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaruriappDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
