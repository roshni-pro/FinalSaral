import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcustomerlevelComponent } from './showcustomerlevel.component';

describe('ShowcustomerlevelComponent', () => {
  let component: ShowcustomerlevelComponent;
  let fixture: ComponentFixture<ShowcustomerlevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowcustomerlevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcustomerlevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
