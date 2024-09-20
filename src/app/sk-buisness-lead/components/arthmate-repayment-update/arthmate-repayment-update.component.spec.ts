import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArthmateRepaymentUpdateComponent } from './arthmate-repayment-update.component';

describe('ArthmateRepaymentUpdateComponent', () => {
  let component: ArthmateRepaymentUpdateComponent;
  let fixture: ComponentFixture<ArthmateRepaymentUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArthmateRepaymentUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArthmateRepaymentUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
