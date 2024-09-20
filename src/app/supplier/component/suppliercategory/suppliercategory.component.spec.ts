import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliercategoryComponent } from './suppliercategory.component';

describe('SuppliercategoryComponent', () => {
  let component: SuppliercategoryComponent;
  let fixture: ComponentFixture<SuppliercategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppliercategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliercategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
