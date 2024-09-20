import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCfrArticleComponent } from './upload-cfr-article.component';

describe('UploadCfrArticleComponent', () => {
  let component: UploadCfrArticleComponent;
  let fixture: ComponentFixture<UploadCfrArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadCfrArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCfrArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
