import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryRestrictionComponent } from './inventory-restriction.component';

describe('InventoryRestrictionComponent', () => {
  let component: InventoryRestrictionComponent;
  let fixture: ComponentFixture<InventoryRestrictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryRestrictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryRestrictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
