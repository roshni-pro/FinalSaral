import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLadgerComponent } from './add-ladger.component';

describe('AddLadgerComponent', () => {
  let component: AddLadgerComponent;
  let fixture: ComponentFixture<AddLadgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLadgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLadgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
