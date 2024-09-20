import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCreditLimitComponent } from './store-credit-limit.component';

describe('StoreCreditLimitComponent', () => {
  let component: StoreCreditLimitComponent;
  let fixture: ComponentFixture<StoreCreditLimitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreCreditLimitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCreditLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
