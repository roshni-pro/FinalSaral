import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PscostComponent } from './pscost.component';

describe('PscostComponent', () => {
  let component: PscostComponent;
  let fixture: ComponentFixture<PscostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PscostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PscostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
