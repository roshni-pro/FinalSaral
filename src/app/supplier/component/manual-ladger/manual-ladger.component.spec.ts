import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualLadgerComponent } from './manual-ladger.component';

describe('ManualLadgerComponent', () => {
  let component: ManualLadgerComponent;
  let fixture: ComponentFixture<ManualLadgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualLadgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualLadgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
