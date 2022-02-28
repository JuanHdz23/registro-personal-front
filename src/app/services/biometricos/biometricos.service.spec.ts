import { TestBed } from '@angular/core/testing';

import { BiometricosService } from './biometricos.service';

describe('BiometricosService', () => {
  let service: BiometricosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BiometricosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
