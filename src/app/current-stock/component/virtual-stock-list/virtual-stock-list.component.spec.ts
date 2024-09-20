import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualStockListComponent } from './virtual-stock-list.component';

describe('VirtualStockListComponent', () => {
  let component: VirtualStockListComponent;
  let fixture: ComponentFixture<VirtualStockListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualStockListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualStockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
