import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryAggingComponent } from './inventory-agging.component';

describe('InventoryAggingComponent', () => {
  let component: InventoryAggingComponent;
  let fixture: ComponentFixture<InventoryAggingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryAggingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryAggingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
