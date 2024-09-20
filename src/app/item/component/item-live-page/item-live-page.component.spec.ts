import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemLivePageComponent } from './item-live-page.component';

describe('ItemLivePageComponent', () => {
  let component: ItemLivePageComponent;
  let fixture: ComponentFixture<ItemLivePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemLivePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemLivePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
