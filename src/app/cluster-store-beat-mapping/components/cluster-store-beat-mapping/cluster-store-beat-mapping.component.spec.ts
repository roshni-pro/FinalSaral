import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterStoreBeatMappingComponent } from './cluster-store-beat-mapping.component';

describe('ClusterStoreBeatMappingComponent', () => {
  let component: ClusterStoreBeatMappingComponent;
  let fixture: ComponentFixture<ClusterStoreBeatMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClusterStoreBeatMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterStoreBeatMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
