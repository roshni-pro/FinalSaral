import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombodashboardComponent } from './combodashboard.component';

describe('CombodashboardComponent', () => {
  let component: CombodashboardComponent;
  let fixture: ComponentFixture<CombodashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombodashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombodashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
