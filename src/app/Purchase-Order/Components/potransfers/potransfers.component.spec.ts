import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PotransfersComponent } from './potransfers.component';

describe('PotransfersComponent', () => {
  let component: PotransfersComponent;
  let fixture: ComponentFixture<PotransfersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PotransfersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PotransfersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
