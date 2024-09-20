import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MurliAudioImagesDetailsComponent } from './murli-audio-images-details.component';

describe('MurliAudioImagesDetailsComponent', () => {
  let component: MurliAudioImagesDetailsComponent;
  let fixture: ComponentFixture<MurliAudioImagesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MurliAudioImagesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MurliAudioImagesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
