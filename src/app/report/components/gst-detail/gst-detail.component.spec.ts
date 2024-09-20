import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GstDetailComponent } from './gst-detail.component';

describe('GstDetailComponent', () => {
  let component: GstDetailComponent;
  let fixture: ComponentFixture<GstDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GstDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GstDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
