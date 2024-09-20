import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrIrDifferenceComponent } from './gr-ir-difference.component';

describe('GrIrDifferenceComponent', () => {
  let component: GrIrDifferenceComponent;
  let fixture: ComponentFixture<GrIrDifferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrIrDifferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrIrDifferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
