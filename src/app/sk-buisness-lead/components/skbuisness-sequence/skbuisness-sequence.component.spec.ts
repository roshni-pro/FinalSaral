import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SKBuisnessSequenceComponent } from './skbuisness-sequence.component';

describe('SKBuisnessSequenceComponent', () => {
  let component: SKBuisnessSequenceComponent;
  let fixture: ComponentFixture<SKBuisnessSequenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SKBuisnessSequenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SKBuisnessSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
