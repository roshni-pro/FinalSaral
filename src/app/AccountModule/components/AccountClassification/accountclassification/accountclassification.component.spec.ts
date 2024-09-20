import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountclassificationComponent } from './accountclassification.component';

describe('AccountclassificationComponent', () => {
  let component: AccountclassificationComponent;
  let fixture: ComponentFixture<AccountclassificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountclassificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountclassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
