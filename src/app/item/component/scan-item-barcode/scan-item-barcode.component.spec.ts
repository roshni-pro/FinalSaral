import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanItemBarcodeComponent } from './scan-item-barcode.component';

describe('ScanItemBarcodeComponent', () => {
  let component: ScanItemBarcodeComponent;
  let fixture: ComponentFixture<ScanItemBarcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanItemBarcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanItemBarcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
