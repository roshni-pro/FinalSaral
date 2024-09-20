import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdepotpageComponent } from './editdepotpage.component';

describe('EditdepotpageComponent', () => {
  let component: EditdepotpageComponent;
  let fixture: ComponentFixture<EditdepotpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditdepotpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdepotpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
