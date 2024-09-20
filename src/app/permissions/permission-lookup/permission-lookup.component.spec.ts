import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionLookupComponent } from './permission-lookup.component';

describe('PermissionLookupComponent', () => {
  let component: PermissionLookupComponent;
  let fixture: ComponentFixture<PermissionLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
