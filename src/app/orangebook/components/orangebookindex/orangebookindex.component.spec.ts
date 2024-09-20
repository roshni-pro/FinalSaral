import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrangebookindexComponent } from './orangebookindex.component';

describe('OrangebookindexComponent', () => {
  let component: OrangebookindexComponent;
  let fixture: ComponentFixture<OrangebookindexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrangebookindexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrangebookindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
