import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfieImageComponent } from './selfie-image.component';

describe('SelfieImageComponent', () => {
  let component: SelfieImageComponent;
  let fixture: ComponentFixture<SelfieImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfieImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfieImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
