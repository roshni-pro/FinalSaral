import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmListPageComponent } from './crm-list-page.component';

describe('CrmListPageComponent', () => {
  let component: CrmListPageComponent;
  let fixture: ComponentFixture<CrmListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
