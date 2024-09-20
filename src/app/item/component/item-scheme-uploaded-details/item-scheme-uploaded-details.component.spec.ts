import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSchemeUploadedDetailsComponent } from './item-scheme-uploaded-details.component';

describe('ItemSchemeUploadedDetailsComponent', () => {
  let component: ItemSchemeUploadedDetailsComponent;
  let fixture: ComponentFixture<ItemSchemeUploadedDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemSchemeUploadedDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSchemeUploadedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
