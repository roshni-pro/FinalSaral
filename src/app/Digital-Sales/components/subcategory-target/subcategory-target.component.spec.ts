import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryTargetComponent } from './subcategory-target.component';

describe('SubcategoryTargetComponent', () => {
  let component: SubcategoryTargetComponent;
  let fixture: ComponentFixture<SubcategoryTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcategoryTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoryTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
