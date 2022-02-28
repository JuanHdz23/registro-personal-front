import { TestBed } from '@angular/core/testing';

import { AfisService } from './afis.service';

describe('AfisService', () => {
  let service: AfisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AfisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
