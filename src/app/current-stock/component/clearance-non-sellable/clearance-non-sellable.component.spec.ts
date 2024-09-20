import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearanceNonSellableComponent } from './clearance-non-sellable.component';

describe('ClearanceNonSellableComponent', () => {
  let component: ClearanceNonSellableComponent;
  let fixture: ComponentFixture<ClearanceNonSellableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClearanceNonSellableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearanceNonSellableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
