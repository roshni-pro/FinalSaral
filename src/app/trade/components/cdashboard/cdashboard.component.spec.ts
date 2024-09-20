import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CDashboardComponent } from './cdashboard.component';

describe('CDashboardComponent', () => {
  let component: CDashboardComponent;
  let fixture: ComponentFixture<CDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
