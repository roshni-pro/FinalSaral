import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierOnboardComponent } from './supplier-onboard.component';

describe('SupplierOnboardComponent', () => {
  let component: SupplierOnboardComponent;
  let fixture: ComponentFixture<SupplierOnboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierOnboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierOnboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
