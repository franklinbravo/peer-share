import { TestBed } from '@angular/core/testing';

import { DatapeerService } from './datapeer.service';

describe('DatapeerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatapeerService = TestBed.get(DatapeerService);
    expect(service).toBeTruthy();
  });
});
