import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MurliComponent } from './murli.component';

describe('MurliComponent', () => {
  let component: MurliComponent;
  let fixture: ComponentFixture<MurliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MurliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MurliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
