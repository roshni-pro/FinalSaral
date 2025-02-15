import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSupplierComponent } from './addSupplier.component';

describe('AddSupplierComponent', () => {
  let component: AddSupplierComponent;
  let fixture: ComponentFixture<AddSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
