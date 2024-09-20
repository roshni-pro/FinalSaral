import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderAssignentItemDetailsComponent } from './order-assignent-item-details.component';



describe('OrderAssignentItemDetailsComponent', () => {
  let component: OrderAssignentItemDetailsComponent;
  let fixture: ComponentFixture<OrderAssignentItemDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderAssignentItemDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAssignentItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
