import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubcategoryTargetDashboardComponent } from './add-subcategory-target-dashboard.component';

describe('AddSubcategoryTargetDashboardComponent', () => {
  let component: AddSubcategoryTargetDashboardComponent;
  let fixture: ComponentFixture<AddSubcategoryTargetDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubcategoryTargetDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubcategoryTargetDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
