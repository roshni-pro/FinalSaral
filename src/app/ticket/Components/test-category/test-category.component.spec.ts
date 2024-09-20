import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCategoryComponent } from './test-category.component';

describe('TestCategoryComponent', () => {
  let component: TestCategoryComponent;
  let fixture: ComponentFixture<TestCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
