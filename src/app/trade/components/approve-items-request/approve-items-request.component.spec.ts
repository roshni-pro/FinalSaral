import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveItemsRequestComponent } from './approve-items-request.component';

describe('ApproveItemsRequestComponent', () => {
  let component: ApproveItemsRequestComponent;
  let fixture: ComponentFixture<ApproveItemsRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveItemsRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveItemsRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
