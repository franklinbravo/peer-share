import { TestBed } from '@angular/core/testing';

import { PeerconnectService } from './peerconnect.service';

describe('PeerconnectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PeerconnectService = TestBed.get(PeerconnectService);
    expect(service).toBeTruthy();
  });
});
