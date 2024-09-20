import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentBidComponent } from './current-bid.component';

describe('CurrentBidComponent', () => {
  let component: CurrentBidComponent;
  let fixture: ComponentFixture<CurrentBidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentBidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
