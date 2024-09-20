import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesGroupComponent } from './sales-group.component';

describe('SalesGroupComponent', () => {
  let component: SalesGroupComponent;
  let fixture: ComponentFixture<SalesGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
