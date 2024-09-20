import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombodetailsComponent } from './combodetails.component';

describe('CombodetailsComponent', () => {
  let component: CombodetailsComponent;
  let fixture: ComponentFixture<CombodetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombodetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombodetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
