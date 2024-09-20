import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForCastInventoryDaysComponent } from './for-cast-inventory-days.component';

describe('ForCastInventoryDaysComponent', () => {
  let component: ForCastInventoryDaysComponent;
  let fixture: ComponentFixture<ForCastInventoryDaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForCastInventoryDaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForCastInventoryDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
