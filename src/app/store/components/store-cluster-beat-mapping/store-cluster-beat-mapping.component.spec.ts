import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreClusterBeatMappingComponent } from './store-cluster-beat-mapping.component';

describe('StoreClusterBeatMappingComponent', () => {
  let component: StoreClusterBeatMappingComponent;
  let fixture: ComponentFixture<StoreClusterBeatMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreClusterBeatMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreClusterBeatMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
