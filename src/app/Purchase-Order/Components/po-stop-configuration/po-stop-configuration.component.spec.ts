import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoStopConfigurationComponent } from './po-stop-configuration.component';

describe('PoStopConfigurationComponent', () => {
  let component: PoStopConfigurationComponent;
  let fixture: ComponentFixture<PoStopConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoStopConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoStopConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
