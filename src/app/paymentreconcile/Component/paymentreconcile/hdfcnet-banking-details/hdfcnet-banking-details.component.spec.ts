import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HDFCNetBankingDetailsComponent } from './hdfcnet-banking-details.component';

describe('HDFCNetBankingDetailsComponent', () => {
  let component: HDFCNetBankingDetailsComponent;
  let fixture: ComponentFixture<HDFCNetBankingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HDFCNetBankingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HDFCNetBankingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
