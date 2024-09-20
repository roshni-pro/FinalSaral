import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierpaymentdetailsComponent } from './supplierpaymentdetails.component';

describe('SupplierpaymentdetailsComponent', () => {
  let component: SupplierpaymentdetailsComponent;
  let fixture: ComponentFixture<SupplierpaymentdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierpaymentdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierpaymentdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
