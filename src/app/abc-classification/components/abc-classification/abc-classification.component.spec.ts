import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ABCClassificationComponent } from './abc-classification.component';

describe('ABCClassificationComponent', () => {
  let component: ABCClassificationComponent;
  let fixture: ComponentFixture<ABCClassificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ABCClassificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ABCClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
