import { TestBed } from '@angular/core/testing';

import { RnpspService } from './rnpsp.service';

describe('RnpspService', () => {
  let service: RnpspService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RnpspService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
