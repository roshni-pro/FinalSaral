import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterStoreComponent } from './cluster-store.component';

describe('ClusterStoreComponent', () => {
  let component: ClusterStoreComponent;
  let fixture: ComponentFixture<ClusterStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClusterStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
