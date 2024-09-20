import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClusterCityMapComponent } from './view-cluster-city-map.component';

describe('ViewClusterCityMapComponent', () => {
  let component: ViewClusterCityMapComponent;
  let fixture: ComponentFixture<ViewClusterCityMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewClusterCityMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewClusterCityMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
