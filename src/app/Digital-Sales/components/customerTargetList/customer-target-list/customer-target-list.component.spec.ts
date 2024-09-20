import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTargetListComponent } from './customer-target-list.component';

describe('CustomerTargetListComponent', () => {
  let component: CustomerTargetListComponent;
  let fixture: ComponentFixture<CustomerTargetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerTargetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTargetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
