import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleIncentiveComponent } from './sale-incentive.component';

describe('SaleIncentiveComponent', () => {
  let component: SaleIncentiveComponent;
  let fixture: ComponentFixture<SaleIncentiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleIncentiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleIncentiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
