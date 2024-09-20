import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOpenPoComponent } from './view-open-po.component';

describe('ViewOpenPoComponent', () => {
  let component: ViewOpenPoComponent;
  let fixture: ComponentFixture<ViewOpenPoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOpenPoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOpenPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
