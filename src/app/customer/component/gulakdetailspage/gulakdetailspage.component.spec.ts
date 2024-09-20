import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GulakdetailspageComponent } from './gulakdetailspage.component';

describe('GulakdetailspageComponent', () => {
  let component: GulakdetailspageComponent;
  let fixture: ComponentFixture<GulakdetailspageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GulakdetailspageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GulakdetailspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
