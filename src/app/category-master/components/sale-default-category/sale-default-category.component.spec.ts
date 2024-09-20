import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleDefaultCategoryComponent } from './sale-default-category.component';

describe('SaleDefaultCategoryComponent', () => {
  let component: SaleDefaultCategoryComponent;
  let fixture: ComponentFixture<SaleDefaultCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleDefaultCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleDefaultCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
