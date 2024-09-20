import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandWiseSaleCompaireActualVsForecastComponent } from './brand-wise-sale-compaire-actual-vs-forecast.component';

describe('BrandWiseSaleCompaireActualVsForecastComponent', () => {
  let component: BrandWiseSaleCompaireActualVsForecastComponent;
  let fixture: ComponentFixture<BrandWiseSaleCompaireActualVsForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandWiseSaleCompaireActualVsForecastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandWiseSaleCompaireActualVsForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
