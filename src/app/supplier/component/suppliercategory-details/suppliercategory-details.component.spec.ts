import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliercategoryDetailsComponent } from './suppliercategory-details.component';

describe('SuppliercategoryDetailsComponent', () => {
  let component: SuppliercategoryDetailsComponent;
  let fixture: ComponentFixture<SuppliercategoryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppliercategoryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliercategoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
