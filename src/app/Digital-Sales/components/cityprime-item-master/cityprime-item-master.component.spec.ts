import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityprimeItemMasterComponent } from './cityprime-item-master.component';

describe('CityprimeItemMasterComponent', () => {
  let component: CityprimeItemMasterComponent;
  let fixture: ComponentFixture<CityprimeItemMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityprimeItemMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityprimeItemMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
