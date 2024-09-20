import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedItemListComponent } from './selected-item-list.component';

describe('SelectedItemListComponent', () => {
  let component: SelectedItemListComponent;
  let fixture: ComponentFixture<SelectedItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
