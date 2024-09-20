import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPoDashboardComponent } from './detail-po-dashboard.component';

describe('DetailPoDashboardComponent', () => {
  let component: DetailPoDashboardComponent;
  let fixture: ComponentFixture<DetailPoDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPoDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
