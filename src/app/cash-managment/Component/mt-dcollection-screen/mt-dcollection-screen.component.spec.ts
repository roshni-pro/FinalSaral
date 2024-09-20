import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtDCollectionScreenComponent } from './mt-dcollection-screen.component';

describe('MtDCollectionScreenComponent', () => {
  let component: MtDCollectionScreenComponent;
  let fixture: ComponentFixture<MtDCollectionScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtDCollectionScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtDCollectionScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
