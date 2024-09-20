import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesAppConfigCatalogComponent } from './sales-app-config-catalog.component';

describe('SalesAppConfigCatalogComponent', () => {
  let component: SalesAppConfigCatalogComponent;
  let fixture: ComponentFixture<SalesAppConfigCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesAppConfigCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesAppConfigCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
