import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemClassificationIncentiveReportComponent } from './item-classification-incentive-report.component';

describe('ItemClassificationIncentiveReportComponent', () => {
  let component: ItemClassificationIncentiveReportComponent;
  let fixture: ComponentFixture<ItemClassificationIncentiveReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemClassificationIncentiveReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemClassificationIncentiveReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
