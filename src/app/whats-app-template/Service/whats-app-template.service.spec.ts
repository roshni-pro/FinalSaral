import { TestBed } from '@angular/core/testing';

import { WhatsAppTemplateService } from './whats-app-template.service';

describe('WhatsAppTemplateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WhatsAppTemplateService = TestBed.get(WhatsAppTemplateService);
    expect(service).toBeTruthy();
  });
});
