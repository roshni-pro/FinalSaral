import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerOrderDirectionComponent } from './consumer-order-direction.component';

describe('ConsumerOrderDirectionComponent', () => {
  let component: ConsumerOrderDirectionComponent;
  let fixture: ComponentFixture<ConsumerOrderDirectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerOrderDirectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerOrderDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
