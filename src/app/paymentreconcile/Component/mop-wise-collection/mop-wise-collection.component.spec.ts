import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MopWiseCollectionComponent } from './mop-wise-collection.component';

describe('MopWiseCollectionComponent', () => {
  let component: MopWiseCollectionComponent;
  let fixture: ComponentFixture<MopWiseCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MopWiseCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MopWiseCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
