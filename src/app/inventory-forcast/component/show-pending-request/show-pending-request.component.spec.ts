import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPendingRequestComponent } from './show-pending-request.component';

describe('ShowPendingRequestComponent', () => {
  let component: ShowPendingRequestComponent;
  let fixture: ComponentFixture<ShowPendingRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPendingRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPendingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
