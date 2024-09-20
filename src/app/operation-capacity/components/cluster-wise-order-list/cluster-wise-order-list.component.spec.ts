import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterWiseOrderListComponent } from './cluster-wise-order-list.component';

describe('ClusterWiseOrderListComponent', () => {
  let component: ClusterWiseOrderListComponent;
  let fixture: ComponentFixture<ClusterWiseOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClusterWiseOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterWiseOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
