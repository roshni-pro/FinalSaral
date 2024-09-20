import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrangebookIndexEditComponent } from './orangebook-index-edit.component';

describe('OrangebookIndexEditComponent', () => {
  let component: OrangebookIndexEditComponent;
  let fixture: ComponentFixture<OrangebookIndexEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrangebookIndexEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrangebookIndexEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
