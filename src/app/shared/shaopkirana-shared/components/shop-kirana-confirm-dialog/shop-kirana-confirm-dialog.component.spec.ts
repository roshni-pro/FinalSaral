import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopKiranaConfirmDialogComponent } from './shop-kirana-confirm-dialog.component';

describe('ShopKiranaConfirmDialogComponent', () => {
  let component: ShopKiranaConfirmDialogComponent;
  let fixture: ComponentFixture<ShopKiranaConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopKiranaConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopKiranaConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
