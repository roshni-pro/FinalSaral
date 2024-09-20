import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformListPageComponent } from './platform-list-page.component';

describe('PlatformListPageComponent', () => {
  let component: PlatformListPageComponent;
  let fixture: ComponentFixture<PlatformListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
