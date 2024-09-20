import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompanyTargetComponent } from './add-company-target.component';

describe('AddCompanyTargetComponent', () => {
  let component: AddCompanyTargetComponent;
  let fixture: ComponentFixture<AddCompanyTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCompanyTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCompanyTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
