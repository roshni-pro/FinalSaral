import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCycleApprovalForWHComponent } from './inventory-cycle-approval-for-wh.component';

describe('InventoryCycleApprovalForWHComponent', () => {
  let component: InventoryCycleApprovalForWHComponent;
  let fixture: ComponentFixture<InventoryCycleApprovalForWHComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryCycleApprovalForWHComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryCycleApprovalForWHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
