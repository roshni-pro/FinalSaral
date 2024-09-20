import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddwarehouseVedioComponent } from './addwarehouse-vedio.component';

describe('AddwarehouseVedioComponent', () => {
  let component: AddwarehouseVedioComponent;
  let fixture: ComponentFixture<AddwarehouseVedioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddwarehouseVedioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddwarehouseVedioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
