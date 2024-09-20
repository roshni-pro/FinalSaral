import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareItemTradeComponent } from './share-item-trade.component';

describe('ShareItemTradeComponent', () => {
  let component: ShareItemTradeComponent;
  let fixture: ComponentFixture<ShareItemTradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareItemTradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareItemTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
