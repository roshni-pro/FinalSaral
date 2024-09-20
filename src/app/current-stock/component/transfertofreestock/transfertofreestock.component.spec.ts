import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfertofreestockComponent } from './transfertofreestock.component';

describe('TransfertofreestockComponent', () => {
  let component: TransfertofreestockComponent;
  let fixture: ComponentFixture<TransfertofreestockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransfertofreestockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfertofreestockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
