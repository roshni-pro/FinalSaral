import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountClassificationDetailsComponent } from './account-classification-details.component';

describe('AccountClassificationDetailsComponent', () => {
  let component: AccountClassificationDetailsComponent;
  let fixture: ComponentFixture<AccountClassificationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountClassificationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountClassificationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
