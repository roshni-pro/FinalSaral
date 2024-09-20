import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesAppCheckoutComponent } from './sales-app-checkout.component';

describe('SalesAppCheckoutComponent', () => {
  let component: SalesAppCheckoutComponent;
  let fixture: ComponentFixture<SalesAppCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesAppCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesAppCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
