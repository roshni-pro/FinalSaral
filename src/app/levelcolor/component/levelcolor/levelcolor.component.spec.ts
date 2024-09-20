import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelcolorComponent } from './levelcolor.component';

describe('LevelcolorComponent', () => {
  let component: LevelcolorComponent;
  let fixture: ComponentFixture<LevelcolorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelcolorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelcolorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
