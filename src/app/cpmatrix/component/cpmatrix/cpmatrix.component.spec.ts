import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CPMatrixComponent } from './cpmatrix.component';

describe('CPMatrixComponent', () => {
  let component: CPMatrixComponent;
  let fixture: ComponentFixture<CPMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CPMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CPMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
