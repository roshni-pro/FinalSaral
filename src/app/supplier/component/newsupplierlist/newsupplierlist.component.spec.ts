import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsupplierlistComponent } from './newsupplierlist.component';

describe('NewsupplierlistComponent', () => {
  let component: NewsupplierlistComponent;
  let fixture: ComponentFixture<NewsupplierlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsupplierlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsupplierlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
