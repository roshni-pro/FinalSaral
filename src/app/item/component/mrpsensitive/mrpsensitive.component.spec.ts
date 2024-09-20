import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MrpsensitiveComponent } from './mrpsensitive.component';

describe('MrpsensitiveComponent', () => {
  let component: MrpsensitiveComponent;
  let fixture: ComponentFixture<MrpsensitiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MrpsensitiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MrpsensitiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
