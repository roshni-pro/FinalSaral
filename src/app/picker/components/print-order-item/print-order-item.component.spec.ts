import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintOrderItemComponent } from './print-order-item.component';

describe('PrintOrderItemComponent', () => {
  let component: PrintOrderItemComponent;
  let fixture: ComponentFixture<PrintOrderItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintOrderItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
