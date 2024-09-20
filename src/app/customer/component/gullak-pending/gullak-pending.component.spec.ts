import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GullakPendingComponent } from './gullak-pending.component';

describe('GullakPendingComponent', () => {
  let component: GullakPendingComponent;
  let fixture: ComponentFixture<GullakPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GullakPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GullakPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
