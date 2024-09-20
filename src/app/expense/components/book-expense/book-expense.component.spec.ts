import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookExpenseComponent } from './book-expense.component';

describe('BookExpenseComponent', () => {
  let component: BookExpenseComponent;
  let fixture: ComponentFixture<BookExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
