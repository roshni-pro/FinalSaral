import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterMapComponent } from './cluster-map.component';

describe('ClusterMapComponent', () => {
  let component: ClusterMapComponent;
  let fixture: ComponentFixture<ClusterMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClusterMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
