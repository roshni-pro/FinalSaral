import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecherdetailsComponent } from './checherdetails.component';

describe('ChecherdetailsComponent', () => {
  let component: ChecherdetailsComponent;
  let fixture: ComponentFixture<ChecherdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecherdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecherdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
