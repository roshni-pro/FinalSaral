import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTradeListComponent } from './customertrade-list.component';

describe('CustomerTradeListComponent', () => {
  let component: CustomerTradeListComponent;
  let fixture: ComponentFixture<CustomerTradeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerTradeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTradeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
