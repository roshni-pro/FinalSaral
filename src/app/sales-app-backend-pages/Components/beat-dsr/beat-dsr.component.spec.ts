import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatDSRComponent } from './beat-dsr.component';

describe('BeatDSRComponent', () => {
  let component: BeatDSRComponent;
  let fixture: ComponentFixture<BeatDSRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeatDSRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeatDSRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
