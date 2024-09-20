import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareItemAppComponent } from './share-item-app.component';

describe('ShareItemAppComponent', () => {
  let component: ShareItemAppComponent;
  let fixture: ComponentFixture<ShareItemAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareItemAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareItemAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
