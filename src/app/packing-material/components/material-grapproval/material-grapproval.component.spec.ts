import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialGRApprovalComponent } from './material-grapproval.component';

describe('MaterialGRApprovalComponent', () => {
  let component: MaterialGRApprovalComponent;
  let fixture: ComponentFixture<MaterialGRApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialGRApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialGRApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
