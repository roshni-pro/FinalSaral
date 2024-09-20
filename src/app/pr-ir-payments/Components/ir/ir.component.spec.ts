import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IRComponent } from './ir.component';

describe('IRComponent', () => {
  let component: IRComponent;
  let fixture: ComponentFixture<IRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
