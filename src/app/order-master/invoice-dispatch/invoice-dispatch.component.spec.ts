import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDispatchComponent } from './invoice-dispatch.component';

describe('InvoiceDispatchComponent', () => {
  let component: InvoiceDispatchComponent;
  let fixture: ComponentFixture<InvoiceDispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceDispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
