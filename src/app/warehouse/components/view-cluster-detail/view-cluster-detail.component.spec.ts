import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClusterDetailComponent } from './view-cluster-detail.component';

describe('ViewClusterDetailComponent', () => {
  let component: ViewClusterDetailComponent;
  let fixture: ComponentFixture<ViewClusterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewClusterDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewClusterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
