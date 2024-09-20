import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerImagesComponent } from './customer-images.component';

describe('CustomerImagesComponent', () => {
  let component: CustomerImagesComponent;
  let fixture: ComponentFixture<CustomerImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
