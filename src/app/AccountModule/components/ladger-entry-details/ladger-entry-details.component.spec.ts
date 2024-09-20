import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LadgerEntryDetailsComponent } from './ladger-entry-details.component';

describe('LadgerEntryDetailsComponent', () => {
  let component: LadgerEntryDetailsComponent;
  let fixture: ComponentFixture<LadgerEntryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LadgerEntryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LadgerEntryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
