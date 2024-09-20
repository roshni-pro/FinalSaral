import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveCfrArticleComponent } from './live-cfr-article.component';

describe('LiveCfrArticleComponent', () => {
  let component: LiveCfrArticleComponent;
  let fixture: ComponentFixture<LiveCfrArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveCfrArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveCfrArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
