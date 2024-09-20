import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCycleComponent } from './inventory-cycle.component';

describe('InventoryCycleComponent', () => {
  let component: InventoryCycleComponent;
  let fixture: ComponentFixture<InventoryCycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryCycleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
