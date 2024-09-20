import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatDsrTabsComponent } from './beat-dsr-tabs.component';

describe('BeatDsrTabsComponent', () => {
  let component: BeatDsrTabsComponent;
  let fixture: ComponentFixture<BeatDsrTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeatDsrTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeatDsrTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
