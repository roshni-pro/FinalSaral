import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLadgerEntryComponent } from './add-ladger-entry.component';

describe('AddLadgerEntryComponent', () => {
  let component: AddLadgerEntryComponent;
  let fixture: ComponentFixture<AddLadgerEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLadgerEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLadgerEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
