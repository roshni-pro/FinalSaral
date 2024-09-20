import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerUploadDocComponent } from './customer-upload-doc.component';

describe('CustomerUploadDocComponent', () => {
  let component: CustomerUploadDocComponent;
  let fixture: ComponentFixture<CustomerUploadDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerUploadDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerUploadDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
