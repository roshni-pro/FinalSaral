import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyersEditComponent } from './buyers-edit.component';

describe('BuyersEditComponent', () => {
  let component: BuyersEditComponent;
  let fixture: ComponentFixture<BuyersEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyersEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
