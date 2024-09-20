import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArthmateStampComponent } from './arthmate-stamp.component';

describe('ArthmateStampComponent', () => {
  let component: ArthmateStampComponent;
  let fixture: ComponentFixture<ArthmateStampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArthmateStampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArthmateStampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
