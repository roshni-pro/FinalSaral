import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterOwnerComponent } from './master-owner.component';

describe('MasterOwnerComponent', () => {
  let component: MasterOwnerComponent;
  let fixture: ComponentFixture<MasterOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
