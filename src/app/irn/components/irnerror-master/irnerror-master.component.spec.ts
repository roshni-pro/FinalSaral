import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IRNErrorMasterComponent } from './irnerror-master.component';

describe('IRNErrorMasterComponent', () => {
  let component: IRNErrorMasterComponent;
  let fixture: ComponentFixture<IRNErrorMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IRNErrorMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IRNErrorMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
