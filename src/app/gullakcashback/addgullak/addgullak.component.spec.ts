import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddgullakComponent } from './addgullak.component';

describe('AddgullakComponent', () => {
  let component: AddgullakComponent;
  let fixture: ComponentFixture<AddgullakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddgullakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddgullakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
