import { TestBed } from '@angular/core/testing';

import { AsignaEvidenciaService } from './asigna-evidencia.service';

describe('AsignaEvidenciaService', () => {
  let service: AsignaEvidenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsignaEvidenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
