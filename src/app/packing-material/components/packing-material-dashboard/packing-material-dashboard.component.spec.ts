import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingMaterialDashboardComponent } from './packing-material-dashboard.component';

describe('PackingMaterialDashboardComponent', () => {
  let component: PackingMaterialDashboardComponent;
  let fixture: ComponentFixture<PackingMaterialDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackingMaterialDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackingMaterialDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
