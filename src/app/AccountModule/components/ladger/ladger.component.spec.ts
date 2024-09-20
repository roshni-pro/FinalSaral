import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LadgerComponent } from './ladger.component';

describe('LadgerComponent', () => {
  let component: LadgerComponent;
  let fixture: ComponentFixture<LadgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LadgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LadgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
