import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemViewPageComponent } from './item-view-page.component';

describe('ItemViewPageComponent', () => {
  let component: ItemViewPageComponent;
  let fixture: ComponentFixture<ItemViewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemViewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
