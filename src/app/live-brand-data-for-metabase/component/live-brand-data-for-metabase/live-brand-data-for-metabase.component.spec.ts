import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveBrandDataForMetabaseComponent } from './live-brand-data-for-metabase.component';

describe('LiveBrandDataForMetabaseComponent', () => {
  let component: LiveBrandDataForMetabaseComponent;
  let fixture: ComponentFixture<LiveBrandDataForMetabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveBrandDataForMetabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveBrandDataForMetabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
