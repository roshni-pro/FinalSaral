import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TatHolidayComponent } from './tat-holiday.component';

describe('TatHolidayComponent', () => {
  let component: TatHolidayComponent;
  let fixture: ComponentFixture<TatHolidayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TatHolidayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TatHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
