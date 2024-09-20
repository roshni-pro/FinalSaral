import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LadgerTypeAddComponent } from './ladger-type-add.component';

describe('LadgerTypeAddComponent', () => {
  let component: LadgerTypeAddComponent;
  let fixture: ComponentFixture<LadgerTypeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LadgerTypeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LadgerTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
