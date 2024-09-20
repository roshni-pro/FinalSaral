import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplieroutstandingamtComponent } from './supplieroutstandingamt.component';

describe('SupplieroutstandingamtComponent', () => {
  let component: SupplieroutstandingamtComponent;
  let fixture: ComponentFixture<SupplieroutstandingamtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplieroutstandingamtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplieroutstandingamtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
