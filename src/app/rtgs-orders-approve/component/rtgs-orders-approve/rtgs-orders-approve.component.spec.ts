import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RtgsOrdersApproveComponent } from './rtgs-orders-approve.component';

describe('RtgsOrdersApproveComponent', () => {
  let component: RtgsOrdersApproveComponent;
  let fixture: ComponentFixture<RtgsOrdersApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtgsOrdersApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RtgsOrdersApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
