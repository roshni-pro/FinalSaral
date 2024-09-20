import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeCityComponent } from './trade-city.component';

describe('TradeCityComponent', () => {
  let component: TradeCityComponent;
  let fixture: ComponentFixture<TradeCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeCityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
