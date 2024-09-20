import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearExpiryEwaybillsComponent } from './near-expiry-ewaybills.component';

describe('NearExpiryEwaybillsComponent', () => {
  let component: NearExpiryEwaybillsComponent;
  let fixture: ComponentFixture<NearExpiryEwaybillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearExpiryEwaybillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearExpiryEwaybillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
