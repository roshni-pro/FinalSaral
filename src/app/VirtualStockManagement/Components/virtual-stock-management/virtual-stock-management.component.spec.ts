import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualStockManagementComponent } from './virtual-stock-management.component';

describe('VirtualStockManagementComponent', () => {
  let component: VirtualStockManagementComponent;
  let fixture: ComponentFixture<VirtualStockManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualStockManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualStockManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
