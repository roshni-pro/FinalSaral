import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderAssignmentsComponent } from './order-assignments.component';



describe('OrderAssignmentsComponent', () => {
  let component: OrderAssignmentsComponent;
  let fixture: ComponentFixture<OrderAssignmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderAssignmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
