import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterEditinfoComponent } from './cluster-editinfo.component';

describe('ClusterEditinfoComponent', () => {
  let component: ClusterEditinfoComponent;
  let fixture: ComponentFixture<ClusterEditinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClusterEditinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterEditinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
