import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualStockManagementViewComponent } from './virtual-stock-management-view.component';

describe('VirtualStockManagementViewComponent', () => {
  let component: VirtualStockManagementViewComponent;
  let fixture: ComponentFixture<VirtualStockManagementViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualStockManagementViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualStockManagementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
