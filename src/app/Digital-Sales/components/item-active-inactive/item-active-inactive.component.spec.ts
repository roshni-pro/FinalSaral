import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemActiveInactiveComponent } from './item-active-inactive.component';

describe('ItemActiveInactiveComponent', () => {
  let component: ItemActiveInactiveComponent;
  let fixture: ComponentFixture<ItemActiveInactiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemActiveInactiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemActiveInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
