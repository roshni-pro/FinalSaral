import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IrOutstandingComponent } from './ir-outstanding.component';

describe('IrOutstandingComponent', () => {
  let component: IrOutstandingComponent;
  let fixture: ComponentFixture<IrOutstandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrOutstandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrOutstandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
