import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesReturnConfigComponent } from './sales-return-config.component';

describe('SalesReturnConfigComponent', () => {
  let component: SalesReturnConfigComponent;
  let fixture: ComponentFixture<SalesReturnConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesReturnConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesReturnConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
