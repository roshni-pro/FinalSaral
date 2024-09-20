import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationbannerComponent } from './applicationbanner.component';

describe('ApplicationbannerComponent', () => {
  let component: ApplicationbannerComponent;
  let fixture: ComponentFixture<ApplicationbannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationbannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationbannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
