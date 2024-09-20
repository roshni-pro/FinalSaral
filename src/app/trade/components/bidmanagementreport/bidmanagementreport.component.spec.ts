import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidmanagementreportComponent } from './bidmanagementreport.component';

describe('BidmanagementreportComponent', () => {
  let component: BidmanagementreportComponent;
  let fixture: ComponentFixture<BidmanagementreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidmanagementreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidmanagementreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
