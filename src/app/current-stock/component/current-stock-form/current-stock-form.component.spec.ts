import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentStockFormComponent } from './current-stock-form.component';

describe('CurrentStockFormComponent', () => {
  let component: CurrentStockFormComponent;
  let fixture: ComponentFixture<CurrentStockFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentStockFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentStockFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
