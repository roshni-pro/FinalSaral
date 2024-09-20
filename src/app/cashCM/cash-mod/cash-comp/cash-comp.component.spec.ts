import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashCompComponent } from './cash-comp.component';

describe('CashCompComponent', () => {
  let component: CashCompComponent;
  let fixture: ComponentFixture<CashCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
