import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VanTransactionComponent } from './van-transaction.component';

describe('VanTransactionComponent', () => {
  let component: VanTransactionComponent;
  let fixture: ComponentFixture<VanTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VanTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VanTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
