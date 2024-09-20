import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DfrComponent } from './dfr.component';

describe('DfrComponent', () => {
  let component: DfrComponent;
  let fixture: ComponentFixture<DfrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DfrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DfrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
