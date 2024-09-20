import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SKPKPPCommisionComponent } from './skpkppcommision.component';

describe('SKPKPPCommisionComponent', () => {
  let component: SKPKPPCommisionComponent;
  let fixture: ComponentFixture<SKPKPPCommisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SKPKPPCommisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SKPKPPCommisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
