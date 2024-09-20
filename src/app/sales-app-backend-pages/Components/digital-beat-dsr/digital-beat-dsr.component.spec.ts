import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalBeatDsrComponent } from './digital-beat-dsr.component';

describe('DigitalBeatDsrComponent', () => {
  let component: DigitalBeatDsrComponent;
  let fixture: ComponentFixture<DigitalBeatDsrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalBeatDsrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalBeatDsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
