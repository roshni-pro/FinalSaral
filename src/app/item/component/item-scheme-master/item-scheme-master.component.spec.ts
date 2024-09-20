import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSchemeMasterComponent } from './item-scheme-master.component';

describe('ItemSchemeMasterComponent', () => {
  let component: ItemSchemeMasterComponent;
  let fixture: ComponentFixture<ItemSchemeMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemSchemeMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSchemeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
