import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LadgerTypeComponent } from './ladger-type.component';

describe('LadgerTypeComponent', () => {
  let component: LadgerTypeComponent;
  let fixture: ComponentFixture<LadgerTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LadgerTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LadgerTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
