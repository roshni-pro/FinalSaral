import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemWiseSaleCompaireActualVsForecastComponent } from './item-wise-sale-compaire-actual-vs-forecast.component';

describe('ItemWiseSaleCompaireActualVsForecastComponent', () => {
  let component: ItemWiseSaleCompaireActualVsForecastComponent;
  let fixture: ComponentFixture<ItemWiseSaleCompaireActualVsForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemWiseSaleCompaireActualVsForecastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemWiseSaleCompaireActualVsForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
