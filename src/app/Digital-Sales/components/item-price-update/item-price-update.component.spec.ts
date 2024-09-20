import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPriceUpdateComponent } from './item-price-update.component';

describe('ItemPriceUpdateComponent', () => {
  let component: ItemPriceUpdateComponent;
  let fixture: ComponentFixture<ItemPriceUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemPriceUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPriceUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
