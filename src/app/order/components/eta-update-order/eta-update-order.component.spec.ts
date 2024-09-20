import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtaUpdateOrderComponent } from './eta-update-order.component';

describe('EtaUpdateOrderComponent', () => {
  let component: EtaUpdateOrderComponent;
  let fixture: ComponentFixture<EtaUpdateOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtaUpdateOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtaUpdateOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
