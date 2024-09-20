import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LadgerDetailsComponent } from './ladger-details.component';

describe('LadgerDetailsComponent', () => {
  let component: LadgerDetailsComponent;
  let fixture: ComponentFixture<LadgerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LadgerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LadgerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
