import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerconfigurationdetailsComponent } from './ledgerconfigurationdetails.component';

describe('LedgerconfigurationdetailsComponent', () => {
  let component: LedgerconfigurationdetailsComponent;
  let fixture: ComponentFixture<LedgerconfigurationdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LedgerconfigurationdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedgerconfigurationdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
