import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSchemeUploadedComponent } from './item-scheme-uploaded.component';

describe('ItemSchemeUploadedComponent', () => {
  let component: ItemSchemeUploadedComponent;
  let fixture: ComponentFixture<ItemSchemeUploadedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemSchemeUploadedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSchemeUploadedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
