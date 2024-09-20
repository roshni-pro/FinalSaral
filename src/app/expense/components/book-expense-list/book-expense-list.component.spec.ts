import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookExpenseListComponent } from './book-expense-list.component';

describe('BookExpenseListComponent', () => {
  let component: BookExpenseListComponent;
  let fixture: ComponentFixture<BookExpenseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookExpenseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookExpenseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
