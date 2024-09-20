import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MurliWarehouseDetailsComponent } from './murli-warehouse-details.component';

describe('MurliWarehouseDetailsComponent', () => {
  let component: MurliWarehouseDetailsComponent;
  let fixture: ComponentFixture<MurliWarehouseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MurliWarehouseDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MurliWarehouseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
