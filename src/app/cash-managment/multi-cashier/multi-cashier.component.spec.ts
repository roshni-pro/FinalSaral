import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiCashierComponent } from './multi-cashier.component';

describe('MultiCashierComponent', () => {
  let component: MultiCashierComponent;
  let fixture: ComponentFixture<MultiCashierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiCashierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiCashierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
