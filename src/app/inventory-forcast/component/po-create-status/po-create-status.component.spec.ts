import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoCreateStatusComponent } from './po-create-status.component';

describe('PoCreateStatusComponent', () => {
  let component: PoCreateStatusComponent;
  let fixture: ComponentFixture<PoCreateStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoCreateStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoCreateStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
