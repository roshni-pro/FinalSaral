import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSchemeComponent } from './item-scheme.component';

describe('ItemSchemeComponent', () => {
  let component: ItemSchemeComponent;
  let fixture: ComponentFixture<ItemSchemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemSchemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
