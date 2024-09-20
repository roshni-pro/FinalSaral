import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsupplierpageComponent } from './editsupplierpage.component';

describe('EditsupplierpageComponent', () => {
  let component: EditsupplierpageComponent;
  let fixture: ComponentFixture<EditsupplierpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditsupplierpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsupplierpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
