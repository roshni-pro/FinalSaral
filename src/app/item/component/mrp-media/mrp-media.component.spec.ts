import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MrpMediaComponent } from './mrp-media.component';

describe('MrpMediaComponent', () => {
  let component: MrpMediaComponent;
  let fixture: ComponentFixture<MrpMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MrpMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MrpMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
