import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTickerCategoryComponent } from './add-ticker-category.component';

describe('AddTickerCategoryComponent', () => {
  let component: AddTickerCategoryComponent;
  let fixture: ComponentFixture<AddTickerCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTickerCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTickerCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
