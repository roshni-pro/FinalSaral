import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiipingAddressEntryComponent } from './shiiping-address-entry.component';

describe('ShiipingAddressEntryComponent', () => {
  let component: ShiipingAddressEntryComponent;
  let fixture: ComponentFixture<ShiipingAddressEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiipingAddressEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiipingAddressEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
