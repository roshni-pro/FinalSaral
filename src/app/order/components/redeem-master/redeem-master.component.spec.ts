import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemMasterComponent } from './redeem-master.component';

describe('RedeemMasterComponent', () => {
  let component: RedeemMasterComponent;
  let fixture: ComponentFixture<RedeemMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedeemMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeemMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
