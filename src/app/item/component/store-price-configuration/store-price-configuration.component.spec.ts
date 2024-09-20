import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePriceConfigurationComponent } from './store-price-configuration.component';

describe('StorePriceConfigurationComponent', () => {
  let component: StorePriceConfigurationComponent;
  let fixture: ComponentFixture<StorePriceConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorePriceConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorePriceConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
