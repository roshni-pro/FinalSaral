import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrangebookacceptanceComponent } from './orangebookacceptance.component';

describe('OrangebookacceptanceComponent', () => {
  let component: OrangebookacceptanceComponent;
  let fixture: ComponentFixture<OrangebookacceptanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrangebookacceptanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrangebookacceptanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
