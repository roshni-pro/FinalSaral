import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBackendOrderComponent } from './create-backend-order.component';

describe('CreateBackendOrderComponent', () => {
  let component: CreateBackendOrderComponent;
  let fixture: ComponentFixture<CreateBackendOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBackendOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBackendOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
