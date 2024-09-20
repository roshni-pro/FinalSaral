import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfrComponent } from './cfr.component';

describe('CfrComponent', () => {
  let component: CfrComponent;
  let fixture: ComponentFixture<CfrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
