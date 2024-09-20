import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InActiveCustOrderComponent } from './in-active-cust-order.component';

describe('InActiveCustOrderComponent', () => {
  let component: InActiveCustOrderComponent;
  let fixture: ComponentFixture<InActiveCustOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InActiveCustOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InActiveCustOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
