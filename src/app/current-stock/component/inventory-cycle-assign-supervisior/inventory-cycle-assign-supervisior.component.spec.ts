import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCycleAssignSupervisiorComponent } from './inventory-cycle-assign-supervisior.component';

describe('InventoryCycleAssignSupervisiorComponent', () => {
  let component: InventoryCycleAssignSupervisiorComponent;
  let fixture: ComponentFixture<InventoryCycleAssignSupervisiorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryCycleAssignSupervisiorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryCycleAssignSupervisiorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
