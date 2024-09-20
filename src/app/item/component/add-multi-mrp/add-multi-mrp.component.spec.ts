import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMultiMRPComponent } from './add-multi-mrp.component';

describe('AddMultiMRPComponent', () => {
  let component: AddMultiMRPComponent;
  let fixture: ComponentFixture<AddMultiMRPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMultiMRPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMultiMRPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
