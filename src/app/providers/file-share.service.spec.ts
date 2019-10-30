import { TestBed } from '@angular/core/testing';

import { FileShareService } from './file-share.service';

describe('FileShareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileShareService = TestBed.get(FileShareService);
    expect(service).toBeTruthy();
  });
});
