import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GullakCashBackDetailsComponent } from './gullak-cash-back-details.component';

describe('GullakCashBackDetailsComponent', () => {
  let component: GullakCashBackDetailsComponent;
  let fixture: ComponentFixture<GullakCashBackDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GullakCashBackDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GullakCashBackDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
