import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandcustomerComponent } from './demandcustomer.component';

describe('DemandcustomerComponent', () => {
  let component: DemandcustomerComponent;
  let fixture: ComponentFixture<DemandcustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandcustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
