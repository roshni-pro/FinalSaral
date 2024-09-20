import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemForecastForPoComponent } from './item-forecast-for-po.component';

describe('ItemForecastForPoComponent', () => {
  let component: ItemForecastForPoComponent;
  let fixture: ComponentFixture<ItemForecastForPoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemForecastForPoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemForecastForPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
