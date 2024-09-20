import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdepotpageComponent } from './viewdepotpage.component';

describe('ViewdepotpageComponent', () => {
  let component: ViewdepotpageComponent;
  let fixture: ComponentFixture<ViewdepotpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewdepotpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewdepotpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
