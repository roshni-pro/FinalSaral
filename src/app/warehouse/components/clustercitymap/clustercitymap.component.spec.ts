import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClustercitymapComponent } from './clustercitymap.component';

describe('ClustercitymapComponent', () => {
  let component: ClustercitymapComponent;
  let fixture: ComponentFixture<ClustercitymapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClustercitymapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClustercitymapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
