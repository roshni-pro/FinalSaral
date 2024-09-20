import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcomboComponent } from './editcombo.component';

describe('EditcomboComponent', () => {
  let component: EditcomboComponent;
  let fixture: ComponentFixture<EditcomboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcomboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcomboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
