import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkingCapitalComponent } from './add-working-capital.component';

describe('AddWorkingCapitalComponent', () => {
  let component: AddWorkingCapitalComponent;
  let fixture: ComponentFixture<AddWorkingCapitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWorkingCapitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkingCapitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
