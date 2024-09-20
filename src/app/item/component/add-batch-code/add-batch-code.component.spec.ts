import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBatchCodeComponent } from './add-batch-code.component';

describe('AddBatchCodeComponent', () => {
  let component: AddBatchCodeComponent;
  let fixture: ComponentFixture<AddBatchCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBatchCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBatchCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
