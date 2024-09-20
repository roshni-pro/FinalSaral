import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseVedioComponent } from './warehouse-vedio.component';

describe('WarehouseVedioComponent', () => {
  let component: WarehouseVedioComponent;
  let fixture: ComponentFixture<WarehouseVedioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseVedioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseVedioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
