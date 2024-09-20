import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerdelightComponent } from './customerdelight.component';

describe('CustomerdelightComponent', () => {
  let component: CustomerdelightComponent;
  let fixture: ComponentFixture<CustomerdelightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerdelightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerdelightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
