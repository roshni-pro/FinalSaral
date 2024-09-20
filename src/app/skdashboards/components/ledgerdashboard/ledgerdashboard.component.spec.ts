import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerdashboardComponent } from './ledgerdashboard.component';

describe('LedgerdashboardComponent', () => {
  let component: LedgerdashboardComponent;
  let fixture: ComponentFixture<LedgerdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LedgerdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedgerdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
