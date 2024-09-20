import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualStockDetailListComponent } from './virtual-stock-detail-list.component';

describe('VirtualStockDetailListComponent', () => {
  let component: VirtualStockDetailListComponent;
  let fixture: ComponentFixture<VirtualStockDetailListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualStockDetailListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualStockDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
