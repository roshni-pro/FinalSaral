import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialItemMasterComponent } from './material-item-master.component';

describe('MaterialItemMasterComponent', () => {
  let component: MaterialItemMasterComponent;
  let fixture: ComponentFixture<MaterialItemMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialItemMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialItemMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
