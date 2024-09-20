import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesAppConfigComponent } from './sales-app-config.component';

describe('SalesAppConfigComponent', () => {
  let component: SalesAppConfigComponent;
  let fixture: ComponentFixture<SalesAppConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesAppConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesAppConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
