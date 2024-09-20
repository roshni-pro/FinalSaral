import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageviewOrderComponent } from './damageview-order.component';

describe('DamageviewOrderComponent', () => {
  let component: DamageviewOrderComponent;
  let fixture: ComponentFixture<DamageviewOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DamageviewOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DamageviewOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
