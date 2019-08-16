import { TestBed } from '@angular/core/testing';

import { ComponentComunicationService } from './component-comunication.service';

describe('ComponentComunicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComponentComunicationService = TestBed.get(ComponentComunicationService);
    expect(service).toBeTruthy();
  });
});
