import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVirtualStockComponent } from './manage-virtual-stock.component';

describe('ManageVirtualStockComponent', () => {
  let component: ManageVirtualStockComponent;
  let fixture: ComponentFixture<ManageVirtualStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageVirtualStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageVirtualStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
