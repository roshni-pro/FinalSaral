import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginwithFlexComponent } from './loginwith-flex.component';

describe('LoginwithFlexComponent', () => {
  let component: LoginwithFlexComponent;
  let fixture: ComponentFixture<LoginwithFlexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginwithFlexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginwithFlexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
