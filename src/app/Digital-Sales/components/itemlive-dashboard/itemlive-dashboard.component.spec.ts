import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemliveDashboardComponent } from './itemlive-dashboard.component';

describe('ItemliveDashboardComponent', () => {
  let component: ItemliveDashboardComponent;
  let fixture: ComponentFixture<ItemliveDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemliveDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemliveDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
