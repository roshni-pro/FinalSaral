import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesAppConfigCatalogCreateNewComponent } from './sales-app-config-catalog-create-new.component';

describe('SalesAppConfigCatalogCreateNewComponent', () => {
  let component: SalesAppConfigCatalogCreateNewComponent;
  let fixture: ComponentFixture<SalesAppConfigCatalogCreateNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesAppConfigCatalogCreateNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesAppConfigCatalogCreateNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
