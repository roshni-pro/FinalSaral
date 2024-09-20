import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TownHallNavigationComponent } from './town-hall-navigation.component';

describe('TownHallNavigationComponent', () => {
  let component: TownHallNavigationComponent;
  let fixture: ComponentFixture<TownHallNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TownHallNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TownHallNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
