import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageMaterialCostComponent } from './package-material-cost.component';

describe('PackageMaterialCostComponent', () => {
  let component: PackageMaterialCostComponent;
  let fixture: ComponentFixture<PackageMaterialCostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageMaterialCostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageMaterialCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
