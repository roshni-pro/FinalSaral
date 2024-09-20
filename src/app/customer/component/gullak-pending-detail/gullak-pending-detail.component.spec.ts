import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GullakPendingDetailComponent } from './gullak-pending-detail.component';

describe('GullakPendingDetailComponent', () => {
  let component: GullakPendingDetailComponent;
  let fixture: ComponentFixture<GullakPendingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GullakPendingDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GullakPendingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
