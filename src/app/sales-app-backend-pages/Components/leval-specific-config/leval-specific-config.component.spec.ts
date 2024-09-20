import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevalSpecificConfigComponent } from './leval-specific-config.component';

describe('LevalSpecificConfigComponent', () => {
  let component: LevalSpecificConfigComponent;
  let fixture: ComponentFixture<LevalSpecificConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevalSpecificConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevalSpecificConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
