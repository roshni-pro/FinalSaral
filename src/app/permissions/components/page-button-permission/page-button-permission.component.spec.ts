import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageButtonPermissionComponent } from './page-button-permission.component';

describe('PageButtonPermissionComponent', () => {
  let component: PageButtonPermissionComponent;
  let fixture: ComponentFixture<PageButtonPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageButtonPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageButtonPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
