import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliercategoryEditComponent } from './suppliercategory-edit.component';

describe('SuppliercategoryEditComponent', () => {
  let component: SuppliercategoryEditComponent;
  let fixture: ComponentFixture<SuppliercategoryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppliercategoryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliercategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
