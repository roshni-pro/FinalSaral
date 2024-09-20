import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerRocComponent } from './buyer-roc.component';

describe('BuyerRocComponent', () => {
  let component: BuyerRocComponent;
  let fixture: ComponentFixture<BuyerRocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerRocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerRocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
