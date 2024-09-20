import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehousematerialslistComponent } from './warehousematerialslist.component';

describe('WarehousematerialslistComponent', () => {
  let component: WarehousematerialslistComponent;
  let fixture: ComponentFixture<WarehousematerialslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehousematerialslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehousematerialslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
