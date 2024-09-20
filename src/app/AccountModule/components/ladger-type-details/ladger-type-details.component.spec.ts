import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LadgerTypeDetailsComponent } from './ladger-type-details.component';

describe('LadgerTypeDetailsComponent', () => {
  let component: LadgerTypeDetailsComponent;
  let fixture: ComponentFixture<LadgerTypeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LadgerTypeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LadgerTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
