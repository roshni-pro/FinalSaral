import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppStartupPopupsComponent } from './app-startup-popups.component';

describe('AppStartupPopupsComponent', () => {
  let component: AppStartupPopupsComponent;
  let fixture: ComponentFixture<AppStartupPopupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppStartupPopupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppStartupPopupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
