import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorverificationImagesComponent } from './distributorverification-images.component';

describe('DistributorverificationImagesComponent', () => {
  let component: DistributorverificationImagesComponent;
  let fixture: ComponentFixture<DistributorverificationImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorverificationImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorverificationImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
