import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearanceLiveItemListComponent } from './clearance-live-item-list.component';

describe('ClearanceLiveItemListComponent', () => {
  let component: ClearanceLiveItemListComponent;
  let fixture: ComponentFixture<ClearanceLiveItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClearanceLiveItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearanceLiveItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
