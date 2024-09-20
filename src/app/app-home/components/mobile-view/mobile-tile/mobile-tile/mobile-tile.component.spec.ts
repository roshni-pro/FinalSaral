import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileTileComponent } from './mobile-tile.component';

describe('MobileTileComponent', () => {
  let component: MobileTileComponent;
  let fixture: ComponentFixture<MobileTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
