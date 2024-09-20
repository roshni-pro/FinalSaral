import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionalRecurringBaseComponent } from './promotional-recurring-base.component';

describe('PromotionalRecurringBaseComponent', () => {
  let component: PromotionalRecurringBaseComponent;
  let fixture: ComponentFixture<PromotionalRecurringBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionalRecurringBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionalRecurringBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
