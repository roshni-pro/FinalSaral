import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierViewPageComponent } from './supplier-view-page.component';

describe('SupplierViewPageComponent', () => {
  let component: SupplierViewPageComponent;
  let fixture: ComponentFixture<SupplierViewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierViewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
