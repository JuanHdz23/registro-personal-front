import { TestBed } from '@angular/core/testing';

import { RecepcionDocumentosService } from './recepcion-documentos.service';

describe('RecepcionDocumentosService', () => {
  let service: RecepcionDocumentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecepcionDocumentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
