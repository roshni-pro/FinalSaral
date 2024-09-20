import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountclassificationAddComponent } from './accountclassification-add.component';

describe('AccountclassificationAddComponent', () => {
  let component: AccountclassificationAddComponent;
  let fixture: ComponentFixture<AccountclassificationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountclassificationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountclassificationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
