import { TestBed } from '@angular/core/testing';

import { VigenciasC3Service } from './vigencias-c3.service';

describe('VigenciasC3Service', () => {
  let service: VigenciasC3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VigenciasC3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
