import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolePagePermissionComponent } from './role-page-permission.component';

describe('RolePagePermissionComponent', () => {
  let component: RolePagePermissionComponent;
  let fixture: ComponentFixture<RolePagePermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolePagePermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolePagePermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
