import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LadgerCorrectionComponent } from './ladger-correction.component';

describe('LadgerCorrectionComponent', () => {
  let component: LadgerCorrectionComponent;
  let fixture: ComponentFixture<LadgerCorrectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LadgerCorrectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LadgerCorrectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
