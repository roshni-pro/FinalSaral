import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcomboComponent } from './addcombo.component';

describe('AddcomboComponent', () => {
  let component: AddcomboComponent;
  let fixture: ComponentFixture<AddcomboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcomboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcomboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
