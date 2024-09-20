import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingMaterialIRComponent } from './packing-material-ir.component';

describe('PackingMaterialIRComponent', () => {
  let component: PackingMaterialIRComponent;
  let fixture: ComponentFixture<PackingMaterialIRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackingMaterialIRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackingMaterialIRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
