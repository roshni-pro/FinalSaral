import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryProvisioningComponent } from './inventory-provisioning.component';

describe('InventoryProvisioningComponent', () => {
  let component: InventoryProvisioningComponent;
  let fixture: ComponentFixture<InventoryProvisioningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryProvisioningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryProvisioningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
