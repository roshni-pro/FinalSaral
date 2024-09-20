import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventCyclesWarehouesComponent } from './invent-cycles-warehoues.component';

describe('InventCyclesWarehouesComponent', () => {
  let component: InventCyclesWarehouesComponent;
  let fixture: ComponentFixture<InventCyclesWarehouesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventCyclesWarehouesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventCyclesWarehouesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
