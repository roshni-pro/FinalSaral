import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDocumentHistoryComponent } from './customer-document-history.component';

describe('CustomerDocumentHistoryComponent', () => {
  let component: CustomerDocumentHistoryComponent;
  let fixture: ComponentFixture<CustomerDocumentHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerDocumentHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDocumentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
