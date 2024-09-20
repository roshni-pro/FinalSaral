import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreebieaUploaderComponent } from './freebiea-uploader.component';

describe('FreebieaUploaderComponent', () => {
  let component: FreebieaUploaderComponent;
  let fixture: ComponentFixture<FreebieaUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreebieaUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreebieaUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
