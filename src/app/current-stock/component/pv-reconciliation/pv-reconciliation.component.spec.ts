import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PvReconciliationComponent } from './pv-reconciliation.component';

describe('PvReconciliationComponent', () => {
  let component: PvReconciliationComponent;
  let fixture: ComponentFixture<PvReconciliationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PvReconciliationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PvReconciliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
