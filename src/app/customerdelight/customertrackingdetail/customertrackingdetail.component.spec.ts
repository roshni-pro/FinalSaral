import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomertrackingdetailComponent } from './customertrackingdetail.component';

describe('CustomertrackingdetailComponent', () => {
  let component: CustomertrackingdetailComponent;
  let fixture: ComponentFixture<CustomertrackingdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomertrackingdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomertrackingdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
