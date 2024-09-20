import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierpaymentComponent } from './supplierpayment.component';

describe('SupplierpaymentComponent', () => {
  let component: SupplierpaymentComponent;
  let fixture: ComponentFixture<SupplierpaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierpaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
