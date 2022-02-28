import { TestBed } from '@angular/core/testing';

import { CitasTramiteService } from './citas-tramite.service';

describe('CitasTramiteService', () => {
  let service: CitasTramiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitasTramiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
