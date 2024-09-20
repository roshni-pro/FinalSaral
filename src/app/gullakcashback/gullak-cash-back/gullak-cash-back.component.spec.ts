import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GullakCashBackComponent } from './gullak-cash-back.component';

describe('GullakCashBackComponent', () => {
  let component: GullakCashBackComponent;
  let fixture: ComponentFixture<GullakCashBackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GullakCashBackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GullakCashBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
