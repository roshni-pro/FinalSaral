import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashDealComponent } from './flash-deal.component';

describe('FlashDealComponent', () => {
  let component: FlashDealComponent;
  let fixture: ComponentFixture<FlashDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashDealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
