import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingMaterialPOComponent } from './packing-material-po.component';

describe('PackingMaterialPOComponent', () => {
  let component: PackingMaterialPOComponent;
  let fixture: ComponentFixture<PackingMaterialPOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackingMaterialPOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackingMaterialPOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
