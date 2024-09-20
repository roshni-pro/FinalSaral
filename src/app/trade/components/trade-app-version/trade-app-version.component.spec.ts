import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeAppVersionComponent } from './trade-app-version.component';

describe('TradeAppVersionComponent', () => {
  let component: TradeAppVersionComponent;
  let fixture: ComponentFixture<TradeAppVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeAppVersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeAppVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
