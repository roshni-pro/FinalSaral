import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnReplaceItemsComponent } from './return-replace-items.component';

describe('ReturnReplaceItemsComponent', () => {
  let component: ReturnReplaceItemsComponent;
  let fixture: ComponentFixture<ReturnReplaceItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnReplaceItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnReplaceItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
