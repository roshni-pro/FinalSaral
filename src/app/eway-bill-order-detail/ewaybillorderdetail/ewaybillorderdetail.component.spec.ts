import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EwaybillorderdetailComponent } from './ewaybillorderdetail.component';

describe('EwaybillorderdetailComponent', () => {
  let component: EwaybillorderdetailComponent;
  let fixture: ComponentFixture<EwaybillorderdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EwaybillorderdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EwaybillorderdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
