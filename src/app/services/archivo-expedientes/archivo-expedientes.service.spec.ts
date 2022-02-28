import { TestBed } from '@angular/core/testing';

import { ArchivoExpedientesService } from './archivo-expedientes.service';

describe('ArchivoExpedientesService', () => {
  let service: ArchivoExpedientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchivoExpedientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
