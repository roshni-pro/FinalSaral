import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTradeItemComponent } from './add-trade-item.component';

describe('AddTradeItemComponent', () => {
  let component: AddTradeItemComponent;
  let fixture: ComponentFixture<AddTradeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTradeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTradeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
