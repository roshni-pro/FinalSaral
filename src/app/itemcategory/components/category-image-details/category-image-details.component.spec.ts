import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryImageDetailsComponent } from './category-image-details.component';

describe('CategoryImageDetailsComponent', () => {
  let component: CategoryImageDetailsComponent;
  let fixture: ComponentFixture<CategoryImageDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryImageDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryImageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
