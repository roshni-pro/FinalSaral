import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerApprovedItemForcastComponent } from './buyer-approved-item-forcast.component';

describe('BuyerApprovedItemForcastComponent', () => {
  let component: BuyerApprovedItemForcastComponent;
  let fixture: ComponentFixture<BuyerApprovedItemForcastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerApprovedItemForcastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerApprovedItemForcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
