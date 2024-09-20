import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IrOutstandingViewComponent } from './ir-outstanding-view.component';

describe('IrOutstandingViewComponent', () => {
  let component: IrOutstandingViewComponent;
  let fixture: ComponentFixture<IrOutstandingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrOutstandingViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrOutstandingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
