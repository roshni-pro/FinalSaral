import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockIntransitComponent } from './stock-intransit.component';

describe('StockIntransitComponent', () => {
  let component: StockIntransitComponent;
  let fixture: ComponentFixture<StockIntransitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockIntransitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockIntransitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
