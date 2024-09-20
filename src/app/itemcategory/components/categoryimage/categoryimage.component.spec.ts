import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryimageComponent } from './categoryimage.component';

describe('CategoryimageComponent', () => {
  let component: CategoryimageComponent;
  let fixture: ComponentFixture<CategoryimageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryimageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
