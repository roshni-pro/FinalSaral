import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCycleApprovalComponent } from './inventory-cycle-approval.component';

describe('InventoryCycleApprovalComponent', () => {
  let component: InventoryCycleApprovalComponent;
  let fixture: ComponentFixture<InventoryCycleApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryCycleApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryCycleApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
