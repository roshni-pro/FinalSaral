import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentIssuedComponent } from './document-issued.component';

describe('DocumentIssuedComponent', () => {
  let component: DocumentIssuedComponent;
  let fixture: ComponentFixture<DocumentIssuedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentIssuedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentIssuedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
