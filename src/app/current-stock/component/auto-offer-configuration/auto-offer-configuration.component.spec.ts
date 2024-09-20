import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoOfferConfigurationComponent } from './auto-offer-configuration.component';

describe('AutoOfferConfigurationComponent', () => {
  let component: AutoOfferConfigurationComponent;
  let fixture: ComponentFixture<AutoOfferConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoOfferConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoOfferConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
