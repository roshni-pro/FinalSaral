import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookExpenseListPageComponent } from './book-expense-list-page.component';

describe('BookExpenseListPageComponent', () => {
  let component: BookExpenseListPageComponent;
  let fixture: ComponentFixture<BookExpenseListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookExpenseListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookExpenseListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
