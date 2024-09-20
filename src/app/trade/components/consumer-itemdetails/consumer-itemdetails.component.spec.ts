import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerItemdetailsComponent } from './consumer-itemdetails.component';

describe('ConsumerItemdetailsComponent', () => {
  let component: ConsumerItemdetailsComponent;
  let fixture: ComponentFixture<ConsumerItemdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerItemdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerItemdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
