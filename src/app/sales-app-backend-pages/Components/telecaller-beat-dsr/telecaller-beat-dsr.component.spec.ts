import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelecallerBeatDsrComponent } from './telecaller-beat-dsr.component';

describe('TelecallerBeatDsrComponent', () => {
  let component: TelecallerBeatDsrComponent;
  let fixture: ComponentFixture<TelecallerBeatDsrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelecallerBeatDsrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelecallerBeatDsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
