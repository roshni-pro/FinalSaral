import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2CSComponent } from './b2-cs.component';

describe('B2CSComponent', () => {
  let component: B2CSComponent;
  let fixture: ComponentFixture<B2CSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2CSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2CSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
