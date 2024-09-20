import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemptDetailsComponent } from './exempt-details.component';

describe('ExemptDetailsComponent', () => {
  let component: ExemptDetailsComponent;
  let fixture: ComponentFixture<ExemptDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExemptDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExemptDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
