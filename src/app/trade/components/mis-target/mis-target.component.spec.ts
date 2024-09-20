import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisTargetComponent } from './mis-target.component';

describe('MisTargetComponent', () => {
  let component: MisTargetComponent;
  let fixture: ComponentFixture<MisTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
