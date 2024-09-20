import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBucketRewardsConditionComponent } from './game-bucket-rewards-condition.component';

describe('GameBucketRewardsConditionComponent', () => {
  let component: GameBucketRewardsConditionComponent;
  let fixture: ComponentFixture<GameBucketRewardsConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameBucketRewardsConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBucketRewardsConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
