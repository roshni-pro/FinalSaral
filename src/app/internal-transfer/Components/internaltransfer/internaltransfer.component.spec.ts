import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternaltransferComponent } from './internaltransfer.component';

describe('InternaltransferComponent', () => {
  let component: InternaltransferComponent;
  let fixture: ComponentFixture<InternaltransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternaltransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternaltransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
