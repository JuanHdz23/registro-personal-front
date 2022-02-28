import { TestBed } from '@angular/core/testing';

import { ConsultaAvanzadaService } from './consulta-avanzada.service';

describe('ConsultaAvanzadaService', () => {
  let service: ConsultaAvanzadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaAvanzadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
