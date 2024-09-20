import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributerpriceComponent } from './distributerprice.component';

describe('DistributerpriceComponent', () => {
  let component: DistributerpriceComponent;
  let fixture: ComponentFixture<DistributerpriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributerpriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributerpriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
