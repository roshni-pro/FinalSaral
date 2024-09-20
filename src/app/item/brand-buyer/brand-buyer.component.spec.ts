import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandBuyerComponent } from './brand-buyer.component';

describe('BrandBuyerComponent', () => {
  let component: BrandBuyerComponent;
  let fixture: ComponentFixture<BrandBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
