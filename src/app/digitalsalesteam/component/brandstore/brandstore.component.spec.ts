import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandstoreComponent } from './brandstore.component';

describe('BrandstoreComponent', () => {
  let component: BrandstoreComponent;
  let fixture: ComponentFixture<BrandstoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandstoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
