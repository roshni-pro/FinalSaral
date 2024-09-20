import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpreportdisplayComponent } from './opreportdisplay.component';

describe('OpreportdisplayComponent', () => {
  let component: OpreportdisplayComponent;
  let fixture: ComponentFixture<OpreportdisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpreportdisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpreportdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
