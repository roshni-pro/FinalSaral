import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuConfigurationComponent } from './sku-configuration.component';

describe('SkuConfigurationComponent', () => {
  let component: SkuConfigurationComponent;
  let fixture: ComponentFixture<SkuConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkuConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
