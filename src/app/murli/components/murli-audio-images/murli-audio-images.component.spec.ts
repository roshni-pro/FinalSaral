import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MurliAudioImagesComponent } from './murli-audio-images.component';

describe('MurliAudioImagesComponent', () => {
  let component: MurliAudioImagesComponent;
  let fixture: ComponentFixture<MurliAudioImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MurliAudioImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MurliAudioImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
