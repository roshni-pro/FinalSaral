import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemBarcodeComponent } from './item-barcode.component';

describe('ItemBarcodeComponent', () => {
  let component: ItemBarcodeComponent;
  let fixture: ComponentFixture<ItemBarcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemBarcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemBarcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
