import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSchemeMasterDetailsComponent } from './item-scheme-master-details.component';

describe('ItemSchemeMasterDetailsComponent', () => {
  let component: ItemSchemeMasterDetailsComponent;
  let fixture: ComponentFixture<ItemSchemeMasterDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemSchemeMasterDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSchemeMasterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
