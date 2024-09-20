import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBucketRewardComponent } from './game-bucket-reward.component';

describe('GameBucketRewardComponent', () => {
  let component: GameBucketRewardComponent;
  let fixture: ComponentFixture<GameBucketRewardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameBucketRewardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBucketRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
