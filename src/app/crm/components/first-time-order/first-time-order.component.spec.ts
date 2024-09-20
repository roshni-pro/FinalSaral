import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstTimeOrderComponent } from './first-time-order.component';

describe('FirstTimeOrderComponent', () => {
  let component: FirstTimeOrderComponent;
  let fixture: ComponentFixture<FirstTimeOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstTimeOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstTimeOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
