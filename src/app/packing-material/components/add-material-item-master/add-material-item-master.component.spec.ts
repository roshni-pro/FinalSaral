import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMaterialItemMasterComponent } from './add-material-item-master.component';

describe('AddMaterialItemMasterComponent', () => {
  let component: AddMaterialItemMasterComponent;
  let fixture: ComponentFixture<AddMaterialItemMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMaterialItemMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMaterialItemMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
