import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LadgerEntryComponent } from './ladger-entry.component';

describe('LadgerEntryComponent', () => {
  let component: LadgerEntryComponent;
  let fixture: ComponentFixture<LadgerEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LadgerEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LadgerEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
