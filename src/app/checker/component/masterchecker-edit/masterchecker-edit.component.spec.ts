import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MastercheckerEditComponent } from './masterchecker-edit.component';

describe('MastercheckerEditComponent', () => {
  let component: MastercheckerEditComponent;
  let fixture: ComponentFixture<MastercheckerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MastercheckerEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MastercheckerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
