import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClusterMapComponent } from './view-cluster-map.component';

describe('ViewClusterMapComponent', () => {
  let component: ViewClusterMapComponent;
  let fixture: ComponentFixture<ViewClusterMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewClusterMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewClusterMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
