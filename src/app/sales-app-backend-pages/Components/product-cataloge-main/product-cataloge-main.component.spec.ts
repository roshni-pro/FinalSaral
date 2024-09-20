import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCatalogeMainComponent } from './product-cataloge-main.component';

describe('ProductCatalogeMainComponent', () => {
  let component: ProductCatalogeMainComponent;
  let fixture: ComponentFixture<ProductCatalogeMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCatalogeMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCatalogeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
